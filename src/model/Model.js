const Observable = include('src/libraries/observable/Observable.js');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
} = include('src/data/Data.js');

const MAX_AMOUNT_OF_PROJECTS = 100;
const MAX_AMOUNT_OF_VALUES = 100;
const MAX_AMOUNT_OF_DERIVED_VALUES = 100;
const MAX_AMOUNT_OF_WIDGETS = 100;

const evaluateCode = (apiResponse, derivedValuesCode, widgetsCode) =>
  eval(`
    let apiResponse = {};
    let derivedValues = {};
    let widgets = {};
    apiResponse = ${apiResponse || "''"};
    ${derivedValuesCode}
    ${widgetsCode}
    result = { apiResponse, derivedValues, widgets };
  `);

const Model = ({ router }) => {
  const dataModel = { projects: [] };
  const viewModel = {
    // All values
    projects: [...new Array(MAX_AMOUNT_OF_PROJECTS).keys()].map(() => ({
      id$: new Observable(''),
      name$: new Observable(''),
      nameInputValue$: new Observable(''),
      isEditing$: new Observable(false),
      isEmpty$: new Observable(true),
    })),

    // Selected values
    selectedProjectId$: new Observable(null),
    selectedProjectName$: new Observable(null),

    lastVisitedProjectView$: new Observable(null),

    derivedValuesEditorIsOpen$: new Observable(false),

    selectedApiUrl$: new Observable(''),
    selectedApiUrlTestPreview$: new Observable(''),
    selectedApiInterval$: new Observable(''),
    apiResponse$: new Observable(''),
    selectedDerivedValuesCode$: new Observable(''),
    selectedWidgetsCode$: new Observable(''),

    values: [...new Array(MAX_AMOUNT_OF_VALUES).keys()].map(() => ({
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
    widgets: [...new Array(MAX_AMOUNT_OF_WIDGETS).keys()].map(() => ({
      label$: new Observable(''),
      edges$: new Observable([]),
      surfaces$: new Observable([]),
      center$: new Observable([0, 0, 0]),
      isEmpty$: new Observable(true),
      is3d$: new Observable(false),
    })),
  };

  viewModel.loadAllProjects = () => {
    dataModel.projects = getAllProjects();
    for (let i = 0; i < MAX_AMOUNT_OF_PROJECTS; i++) {
      viewModel.projects[i].id$.value = '';
      viewModel.projects[i].name$.value = '';
      viewModel.projects[i].nameInputValue$.value = '';
      viewModel.projects[i].isEditing$.value = false;
      viewModel.projects[i].isEmpty$.value = true;
    }
    dataModel.projects.forEach(
      ({ id, name, apiRequests, derivedValuesCode, widgetsCode }, index) => {
        viewModel.projects[index].id$.value = id;
        viewModel.projects[index].name$.value = name;
        viewModel.projects[index].nameInputValue$.value = name;
        viewModel.projects[index].isEmpty$.value = false;
      }
    );
    const selectedProject = dataModel.projects.find(
      ({ id }) => id === viewModel.selectedProjectId$.value
    );
    if (!selectedProject) {
      viewModel.selectedProjectId$.value = null;
      viewModel.selectedProjectName$.value = null;
      viewModel.selectedApiUrl$.value$ = '';
      viewModel.selectedApiInterval$.value = null;
      viewModel.selectedDerivedValuesCode$.value = '';
      viewModel.selectedWidgetsCode$.value = '';
      return;
    }
    viewModel.selectedProjectName$.value /***/ = selectedProject.name;
    viewModel.selectedApiUrl$.value /********/ = selectedProject.apiUrl;
    viewModel.selectedApiInterval$.value /***/ = selectedProject.apiInterval;
    viewModel.selectedDerivedValuesCode$.value =
      selectedProject.derivedValuesCode;
    viewModel.selectedWidgetsCode$.value /***/ = selectedProject.widgetsCode;
  };
  viewModel.loadAllProjects();

  viewModel.createNewProject = () => {
    createProject({
      name: 'Untitled project',
      apiUrl: '',
      apiInterval: 0,
      derivedValuesCode: '',
      widgetsCode: '',
    });
    viewModel.loadAllProjects();
  };

  viewModel.setProjectNameInputValue = (projectId, inputValue) => {
    const project = viewModel.projects.find(
      ({ id$ }) => id$.value === projectId
    );
    if (!project) {
      console.warn(
        'Tried to update project name input value of nonexistent project.'
      );
    }
    project.nameInputValue$.value = inputValue;
  };

  viewModel.editProjectName = (projectId) => {
    const project = viewModel.projects.find(
      ({ id$ }) => id$.value === projectId
    );
    if (!project) {
      console.warn(
        'Tried to cancel editing the name input value of nonexistent project.'
      );
    }
    project.isEditing$.value = true;
  };

  viewModel.cancelEditingProjectName = (projectId) => {
    const project = viewModel.projects.find(
      ({ id$ }) => id$.value === projectId
    );
    if (!project) {
      console.warn(
        'Tried to cancel editing the name input value of nonexistent project.'
      );
    }
    project.nameInputValue$.value = project.name$.value;
    project.isEditing$.value = false;
  };

  viewModel.saveProjectName = (projectId) => {
    const project = viewModel.projects.find(
      ({ id$ }) => id$.value === projectId
    );
    updateProjectById(projectId, {
      name: project.nameInputValue$.value,
    });
    viewModel.loadAllProjects();
  };

  viewModel.saveSelectedProject = () => {
    updateProjectById(viewModel.selectedProjectId$.value, {
      name: viewModel.selectedName$.value,
      apiUrl: viewModel.selectedApiUrl$.value,
      apiInterval: viewModel.selectedApiInterval$.value,
      derivedValuesCode: viewModel.selectedDerivedValuesCode$.value,
      widgetsCode: viewModel.selectedWidgetsCode$.value,
    });
    viewModel.loadAllProjects();
  };

  viewModel.deleteProject = (projectId) => {
    deleteProjectById(projectId);
    viewModel.loadAllProjects();
  };

  viewModel.updateApiUrl = (projectId, apiUrl) => {
    updateProjectById(projectId, { apiUrl });
    viewModel.loadAllProjects();
  };

  viewModel.updateApiInterval = (projectId, apiInterval) => {
    updateProjectById(projectId, { apiInterval });
    viewModel.loadAllProjects();
  };

  viewModel.updateDerivedValuesCode = (projectId, derivedValuesCode) => {
    updateProjectById(projectId, { derivedValuesCode });
    viewModel.loadAllProjects();
  };

  viewModel.updateWidgetsCode = (projectId, widgetsCode) => {
    updateProjectById(projectId, { widgetsCode });
    viewModel.loadAllProjects();
  };

  viewModel.testApiUrlInput = () => {
    fetch(viewModel.selectedApiUrl$.value)
      .then((response) => response.json())
      .then((jsonResponse) => {
        viewModel.selectedApiUrlTestPreview$.value = JSON.stringify(
          jsonResponse,
          null,
          2
        );
      });
  };

  const updateValues = () => {
    let evaluatedCode;
    try {
      evaluatedCode = evaluateCode(
        viewModel.apiResponse$.value,
        viewModel.selectedDerivedValuesCode$.value,
        viewModel.selectedWidgetsCode$.value
      );
    } catch (e) {
      evaluatedCode = { derivedValues: {}, widgets: {} };
    }

    const derivedValuesEntries = Object.entries(evaluatedCode.derivedValues);
    viewModel.derivedValues.forEach(({ label$, value$, isEmpty$ }, index) => {
      label$.value = derivedValuesEntries[index]
        ? derivedValuesEntries[index][0]
        : '';
      value$.value = derivedValuesEntries[index]
        ? derivedValuesEntries[index][1]
        : 0;
      isEmpty$.value = !derivedValuesEntries[index];
    });

    const widgetsEntries = Object.entries(evaluatedCode.widgets);
    viewModel.widgets.forEach(
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
  };

  window.addEventListener(viewModel.apiResponse$.id, updateValues);
  window.addEventListener(
    viewModel.selectedDerivedValuesCode$.id,
    updateValues
  );
  window.addEventListener(viewModel.selectedWidgetsCode$.id, updateValues);

  const fetchDataFromApi = () => {
    fetch(viewModel.selectedApiUrl$.value)
      .then((response) => response.json())
      .then((jsonResponse) => {
        viewModel.apiResponse$.value = JSON.stringify(jsonResponse, null, 2);
      });
  };

  const repeatedlyFetchDataFromApi = (timeoutInSeconds) =>
    setTimeout(() => {
      console.log('repeatedly fetch data from api');
      if (viewModel.selectedApiInterval$.value !== 0) {
        fetchDataFromApi();
      }
      if (timeoutInSeconds === viewModel.selectedApiInterval$.value) {
        repeatedlyFetchDataFromApi(timeoutInSeconds);
      }
    }, timeoutInSeconds * 1000);
  repeatedlyFetchDataFromApi();

  addEventListener(viewModel.selectedApiInterval$.id, () =>
    setTimeout(() => {
      fetchDataFromApi();
      repeatedlyFetchDataFromApi(viewModel.selectedApiInterval$.value);
    }, 1000)
  );
  addEventListener(viewModel.selectedApiUrl$.id, () =>
    setTimeout(() => {
      fetchDataFromApi();
      repeatedlyFetchDataFromApi(viewModel.selectedApiInterval$.value);
    }, 1000)
  );

  const syncSelectedProjectWithRouter = ({ params, currentRoute$ }) => {
    if (currentRoute$.value.indexOf('/projects/<projectId:string>') === 0) {
      const selectedProject = dataModel.projects.find(
        ({ id }) => id === params.projectId
      );
      viewModel.selectedProjectId$.value = selectedProject.id;
      viewModel.selectedProjectName$.value = selectedProject.name;
      viewModel.selectedApiUrl$.value = selectedProject.apiUrl;
      viewModel.selectedApiInterval$.value = selectedProject.apiInterval;
      viewModel.selectedDerivedValuesCode$.value =
        selectedProject.derivedValuesCode;
      viewModel.selectedWidgetsCode$.value = selectedProject.widgetsCode;
      if (
        currentRoute$.value.indexOf(
          '/projects/<projectId:string>/data-sources'
        ) === 0
      ) {
        viewModel.lastVisitedProjectView$.value = 'data-sources';
      }
      if (
        currentRoute$.value.indexOf('/projects/<projectId:string>/values') === 0
      ) {
        viewModel.lastVisitedProjectView$.value = 'values';
      }
      if (
        currentRoute$.value.indexOf(
          '/projects/<projectId:string>/dashboards'
        ) === 0
      ) {
        viewModel.lastVisitedProjectView$.value = 'dashboards';
      }
    }
  };
  syncSelectedProjectWithRouter(router);
  router.onHashChange(syncSelectedProjectWithRouter);

  return viewModel;
};
module.exports = Model;
