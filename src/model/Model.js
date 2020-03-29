const Observable = include('src/libraries/observable/Observable.js');
const { getWidgetsCodeByProjectId } = include('src/data/Data.js');

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
    projects: new Observable([
      { id: '0', name: 'Double wishbone suspension' },
      { id: '1', name: '3D pyramid' },
      { id: '2', name: 'Bar charts' },
    ]),

    selectedProjectId$: new Observable(null),

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

  model.derivedValuesCode$.value = `
      derivedValues['A constant value'] = 45;
      derivedValues['Profit']           = values.sellPrice - values.buyPrice;
      derivedValues['Dollar Profit']    = derivedValues.Profit / 8;
      derivedValues['Compression (cm)'] = Math.random() * 10;
      `;

  window.addEventListener(model.selectedProjectId$.id, ({ detail }) => {
    model.widgetsCode$.value = getWidgetsCodeByProjectId(detail);
  });

  const syncSelectedProjectWithRouter = ({ params, currentRoute$ }) => {
    if (currentRoute$.value.indexOf('/projects/<projectId:string>') === 0) {
      model.selectedProjectId$.value = params.projectId;
      return;
    }
  };
  syncSelectedProjectWithRouter(router);
  router.onHashChange(syncSelectedProjectWithRouter);

  return model;
};
module.exports = Model;
