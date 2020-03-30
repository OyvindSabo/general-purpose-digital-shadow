const Observable = include('src/libraries/observable/Observable.js');
const { getDerivedValuesCodeByProjectId, getWidgetsCodeByProjectId } = include(
  'src/data/Data.js'
);

const MAX_AMOUNT_OF_DERIVED_VALUES = 100;
const MAX_AMOUNT_OF_WIDGETS = 100;

const evaluateCode = (valuesCode, derivedValuesCode, widgetsCode) => {
  return eval(`
    const values = {};
    const derivedValues = {};
    const widgets = {};
    ${valuesCode}
    ${derivedValuesCode}
    ${widgetsCode}
    result = {
      values,
      derivedValues,
      widgets,
    };
  `);
};

const buyPrice$ = new Observable(100);
const sellPrice$ = new Observable(100);

const Model = ({ router }) => {
  const model = {
    projects: new Map([
      ['0', { name: 'Double wishbone suspension', isEditing: false }],
      ['1', { name: '3D pyramid', isEditing: false }],
      ['2', { name: 'Bar charts', isEditing: false }],
    ]),

    selectedProjectId$: new Observable(null),
    selectedProjectName$: new Observable(null),

    lastVisitedProjectView$: new Observable(null),

    derivedValuesEditorIsOpen$: new Observable(false),

    valuesCode$: new Observable(''),
    derivedValuesCode$: new Observable(''),
    widgetsCode$: new Observable(''),

    values: [...new Array(MAX_AMOUNT_OF_DERIVED_VALUES).keys()].map(() => ({
      label$: new Observable(''),
      value$: new Observable(0),
      isEmpty$: new Observable(true),
    })),
    derivedValues: [...new Array(MAX_AMOUNT_OF_DERIVED_VALUES).keys()].map(
      () => ({
        label$: new Observable(''),
        value$: new Observable(0),
        isEmpty$: new Observable(true),
      })
    ),
    widgets: [...new Array(MAX_AMOUNT_OF_DERIVED_VALUES).keys()].map(() => ({
      label$: new Observable(''),
      edges$: new Observable([]),
      surfaces$: new Observable([]),
      center$: new Observable([0, 0, 0]),
      isEmpty$: new Observable(true),
      is3d$: new Observable(false),
    })),
  };

  model.createNewProject = () => {
    model.projects.set(`${Math.random()}${+new Date()}`, {
      name: '',
      isEditing: true,
    });
  };

  window.addEventListener(model.valuesCode$.id, () => {
    const evaluatedCode = evaluateCode(
      model.valuesCode$.value,
      model.derivedValuesCode$.value,
      model.widgetsCode$.value
    );

    const valuesEntries = Object.entries(evaluatedCode.values);
    model.values.forEach(({ label$, value$, isEmpty$ }, index) => {
      label$.value = valuesEntries[index] ? valuesEntries[index][0] : '';
      value$.value = valuesEntries[index] ? valuesEntries[index][1] : 0;
      isEmpty$.value = !Boolean(valuesEntries[index]);
    });

    const derivedValuesEntries = Object.entries(evaluatedCode.derivedValues);
    model.derivedValues.forEach(({ label$, value$, isEmpty$ }, index) => {
      label$.value = derivedValuesEntries[index]
        ? derivedValuesEntries[index][0]
        : '';
      value$.value = derivedValuesEntries[index]
        ? derivedValuesEntries[index][1]
        : 0;
      isEmpty$.value = !derivedValuesEntries[index];
    });

    const widgetsEntries = Object.entries(evaluatedCode.widgets);
    model.widgets.forEach(
      ({ label$, edges$, surfaces$, is3d$, center$, isEmpty$ }, index) => {
        label$.value = widgetsEntries[index] ? widgetsEntries[index][0] : '';
        edges$.value = widgetsEntries[index]
          ? widgetsEntries[index][1].edges || []
          : [];
        surfaces$.value = widgetsEntries[index]
          ? widgetsEntries[index][1].surfaces || []
          : [];
        center$.value = widgetsEntries[index]
          ? widgetsEntries[index][1].center || [0, 0, 0]
          : [0, 0, 0]; // TODO
        is3d$.value = widgetsEntries[index]
          ? widgetsEntries[index][1].is3d || false
          : false; // TODO
        isEmpty$.value = !widgetsEntries[index];
      }
    );
  });

  // We can pretend we are fetching data from an api here
  const updateValues = () => {
    setTimeout(() => {
      buyPrice$.value =
        Math.floor(Math.random() * 2) == 1
          ? buyPrice$.value * 1.01
          : buyPrice$.value / 1.01;
      sellPrice$.value =
        Math.floor(Math.random() * 2) == 1
          ? sellPrice$.value * 1.01
          : sellPrice$.value / 1.01;
      model.valuesCode$.value = `
          values.buyPrice = ${buyPrice$.value};
          values.sellPrice = ${sellPrice$.value};
          `;
      updateValues();
    }, 100);
  };
  updateValues();

  const syncSelectedProjectWithRouter = ({ params, currentRoute$ }) => {
    if (currentRoute$.value.indexOf('/projects/<projectId:string>') === 0) {
      model.selectedProjectId$.value = params.projectId;
      model.selectedProjectName$.value = model.projects.get(
        params.projectId
      ).name;
      model.derivedValuesCode$.value = getDerivedValuesCodeByProjectId(
        params.projectId
      );
      model.widgetsCode$.value = getWidgetsCodeByProjectId(params.projectId);
      if (
        currentRoute$.value.indexOf(
          '/projects/<projectId:string>/data-sources'
        ) === 0
      ) {
        model.lastVisitedProjectView$.value = 'data-sources';
      }
      if (
        currentRoute$.value.indexOf('/projects/<projectId:string>/values') === 0
      ) {
        model.lastVisitedProjectView$.value = 'values';
      }
      if (
        currentRoute$.value.indexOf(
          '/projects/<projectId:string>/dashboards'
        ) === 0
      ) {
        model.lastVisitedProjectView$.value = 'dashboards';
      }
    }
  };
  syncSelectedProjectWithRouter(router);
  router.onHashChange(syncSelectedProjectWithRouter);

  return model;
};
module.exports = Model;
