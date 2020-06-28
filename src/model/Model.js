const {
  getExportedProject,
  getAllProjects,
  createProject,
  updateProjectById,
  deleteProjectById,
} = include('src/data/data.js');

const LanguageParser = include(
  'src/libraries/languageParser/LanguageParser.js'
);

const evaluateCode = (apiResponse, widgetsCode) => {
  let parsedApiResponse;
  try {
    parsedApiResponse = JSON.parse(apiResponse);
  } catch (e) {
    parsedApiResponse = null;
  }
  const evaluatedCodeCalledWithApiResponse = LanguageParser.callWithJavaScriptArguments(
    widgetsCode,
    parsedApiResponse
  );
  return evaluatedCodeCalledWithApiResponse;
};

const Model = ({ router, isExported, state, setState }) => {
  const dataModel = { projects: [] };
  const viewModel = {};

  viewModel.loadAllProjects = () => {
    dataModel.projects = state.isExported
      ? getExportedProject()
      : getAllProjects();
    setState({
      projects: dataModel.projects.map(
        ({ id, name, apiRequests, derivedValuesCode, widgetsCode }, index) => ({
          id,
          name,
          nameInputValue: name,
        })
      ),
    });
    if (state.isExported) {
      setState({ selectedProjectId: dataModel.projects[0].id });
    }

    const selectedProject = dataModel.projects.find(
      ({ id }) => id === state.selectedProjectId
    );
    if (!selectedProject) {
      setState({
        selectedProjectId: null,
        selectedProjectName: null,
        selectedApiUrl: '',
        selectedApiInterval: null,
        selectedWidgetsCode: '',
      });
      return;
    }
    setState({
      selectedProjectName: selectedProject.name,
      selectedApiUrl: selectedProject.apiUrl,
      selectedApiInterval: selectedProject.apiInterval,
      selectedWidgetsCode: selectedProject.widgetsCode,
    });
  };
  viewModel.loadAllProjects();

  viewModel.createNewProject = () => {
    createProject({
      name: 'Untitled project',
      apiUrl: '',
      apiInterval: 0,
      widgetsCode: '',
    });
    viewModel.loadAllProjects();
  };

  viewModel.setProjectNameInputValue = (projectId, inputValue) => {
    setState({
      projects: state.projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, nameInputValue: inputValue };
        }
        return project;
      }),
    });
  };

  viewModel.editProjectName = (projectId) => {
    setState({
      projects: state.projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, isEditing: true };
        }
        return project;
      }),
    });
  };

  viewModel.cancelEditingProjectName = (projectId) => {
    setState({
      projects: state.projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, nameInputValue: project.name, isEditing: false };
        }
        return project;
      }),
    });
  };

  viewModel.saveProjectName = (projectId) => {
    const project = state.projects.find(({ id }) => id === projectId);
    updateProjectById(projectId, {
      name: project.nameInputValue,
    });
    viewModel.loadAllProjects();
  };

  viewModel.saveSelectedProject = () => {
    updateProjectById(state.selectedProjectId, {
      name: state.selectedName,
      apiUrl: state.selectedApiUrl,
      apiInterval: state.selectedApiInterval,
      derivedValuesCode: state.selectedDerivedValuesCode,
      widgetsCode: state.selectedWidgetsCode,
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

  viewModel.updateWidgetsCode = (projectId, widgetsCode) => {
    updateProjectById(projectId, { widgetsCode });
    viewModel.loadAllProjects();
    updateValues();
  };

  viewModel.testApiUrlInput = () => {
    fetch(state.selectedApiUrl)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setState({
          selectedApiUrlTestPreview: JSON.stringify(jsonResponse, null, 2),
        });
      });
  };

  const getWidgetsSchemaErrors = (evaluatedCode) => {
    const widgetsSchemaErrors = [];
    if (!Array.isArray(evaluatedCode)) {
      widgetsSchemaErrors.push(
        `The function you have written should return an array, but instead it returns something of type ${typeof evaluatedCode}`
      );
    } else {
      evaluatedCode.forEach((widget, i) => {
        if (typeof widget !== 'object') {
          widgetsSchemaErrors.push(
            `The widget at index ${i} is not an object, but it should be.`
          );
        }
      });
    }
    return widgetsSchemaErrors;
  };

  // This is currently just an identity function, but could be expanded to do something more
  const normalizeSurfaces = (surfaces) => surfaces;

  // This is currently just an identity function, but could be expanded to do something more
  const normalizeLines = (lines) => lines;

  const normalizeCenter = (center) => [
    center[0] || 0,
    center[1] || 0,
    center[2] || 0,
  ];

  const normalizeWidgets = (widgets) => {
    if (!Array.isArray(widgets)) {
      return [];
    }
    return widgets.map((widget) => ({
      ...widget,
      surfaces: widget.surfaces ? normalizeSurfaces(widget.surfaces) : [],
      lines: widget.lines ? normalizeLines(widget.lines) : [],
      center: widget.center ? normalizeCenter(widget.center) : [0, 0, 0],
      is3d: widget.is3d ? true : false,
    }));
  };

  const updateValues = () => {
    let evaluatedCode;
    let interpretationErrors = [];
    try {
      evaluatedCode = evaluateCode(
        state.apiResponse,
        state.selectedWidgetsCode
      );
    } catch (e) {
      console.warn('Failed to evaluate code: ', e);
      evaluatedCode = [];
      interpretationErrors = [e.message];
    }
    const widgetsSchemaErrors = getWidgetsSchemaErrors(evaluatedCode);
    const normalizedWidgets = normalizeWidgets(evaluatedCode);
    const widgetsCodeErrors = [...interpretationErrors, ...widgetsSchemaErrors];
    setState({
      widgetsCodeRawOutput: JSON.stringify(evaluatedCode, null, 2),
      widgetsCodeErrors,
    });
    if (widgetsSchemaErrors.length) {
      setState({
        widgets: [],
      });
    } else {
      setState({
        widgets: normalizedWidgets,
      });
    }
  };

  const fetchDataFromApi = () => {
    fetch(state.selectedApiUrl)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setState({
          apiResponse: JSON.stringify(jsonResponse, null, 2),
        });
        updateValues();
      });
  };

  let fetchProcessId = Math.random();
  const repeatedlyFetchDataFromApi = (fetchProcessIdAtInitialization) => {
    const timeoutInSeconds = state.selectedApiInterval;
    if (!timeoutInSeconds) return;
    const timeOutInMilliSeconds = timeoutInSeconds * 1000;
    setTimeout(() => {
      if (fetchProcessIdAtInitialization === fetchProcessId) {
        fetchDataFromApi();
        repeatedlyFetchDataFromApi(fetchProcessIdAtInitialization);
      }
    }, timeOutInMilliSeconds);
  };

  const syncSelectedProjectWithRouter = ({ params, currentRoute }) => {
    fetchProcessId = Math.random();
    if (currentRoute.indexOf('/projects/<projectId:string>') === 0) {
      const selectedProject = dataModel.projects.find(
        ({ id }) => id === params.projectId
      );
      setState({
        currentRoute,
        params,
        selectedProjectId: selectedProject.id,
        selectedProjectName: selectedProject.name,
        selectedApiUrl: selectedProject.apiUrl,
        selectedApiInterval: selectedProject.apiInterval,
        selectedWidgetsCode: selectedProject.widgetsCode,
      });
      if (currentRoute === '/projects/<projectId:string>/data-sources') {
        setState({
          currentRoute,
          params,
          lastVisitedProjectView: 'data-sources',
        });
      }
      if (
        currentRoute.indexOf(
          '/projects/<projectId:string>/dashboard-editor'
        ) === 0
      ) {
        setState({
          currentRoute,
          params,
          lastVisitedProjectView: 'dashboard-editor',
        });
        fetchDataFromApi();
        repeatedlyFetchDataFromApi(fetchProcessId);
      }
      if (currentRoute === '/projects/<projectId:string>/dashboard') {
        setState({
          currentRoute,
          params,
          lastVisitedProjectView: 'dashboard',
        });
        fetchDataFromApi();
        repeatedlyFetchDataFromApi(fetchProcessId);
      }
    } else {
      setState({ currentRoute, params });
    }
  };
  syncSelectedProjectWithRouter(router);
  router.onHashChange(syncSelectedProjectWithRouter);

  return viewModel;
};

module.exports = Model;
