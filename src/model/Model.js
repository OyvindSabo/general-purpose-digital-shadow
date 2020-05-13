const Observable = include('src/libraries/observable/Observable.js');
const {
  getExportedProject,
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
} = include('src/data/Data.js');

const evaluateCode = (apiResponse, widgetsCode) => {
  const evaluatedCode = eval(widgetsCode);
  const evaluatedCodeCalledWithApiResponse = evaluatedCode(
    JSON.parse(apiResponse)
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
    // I am here now
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
      selectedAPiInterval: selectedProject.apiInterval,
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
    const project = state.projects.find(({ id$ }) => id$.value === projectId);
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

  const updateValues = () => {
    let evaluatedCode;
    try {
      evaluatedCode = evaluateCode(
        state.apiResponse,
        state.selectedWidgetsCode
      );
    } catch (e) {
      console.log('Failed to evaluate code: ', e);
      evaluatedCode = [];
    }

    setState({
      widgets: evaluatedCode,
    });
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

  const repeatedlyFetchDataFromApi = (timeoutInSeconds) =>
    setTimeout(() => {
      console.log('repeatedly fetch data from api');
      if (state.selectedApiInterval !== 0) {
        fetchDataFromApi();
      }
      if (timeoutInSeconds === state.selectedApiInterval) {
        repeatedlyFetchDataFromApi(timeoutInSeconds);
      }
    }, timeoutInSeconds * 1000);
  repeatedlyFetchDataFromApi();

  /** TODO
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
  */

  const syncSelectedProjectWithRouter = ({ params, currentRoute }) => {
    setState({ currentRoute, params });
    if (currentRoute.indexOf('/projects/<projectId:string>') === 0) {
      const selectedProject = dataModel.projects.find(
        ({ id }) => id === params.projectId
      );
      setState({
        selectedProjectId: selectedProject.id,
        selectedProjectName: selectedProject.name,
        selectedApiUrl: selectedProject.apiUrl,
        selectedApiInterval: selectedProject.apiInterval,
        selectedWidgetsCode: selectedProject.widgetsCode,
      });
      if (currentRoute === '/projects/<projectId:string>/data-sources') {
        setState({
          lastVisitedProjectView: 'data-sources',
        });
      }
      if (
        currentRoute.indexOf('/projects/<projectId:string>/dashboard/edit') ===
        0
      ) {
        setState({
          lastVisitedProjectView: 'edit-dashboard', // TODO: Check that this works
        });
      }
      if (currentRoute === '/projects/<projectId:string>/dashboard') {
        setState({
          lastVisitedProjectView: 'dashboard',
        });
      }
    }
  };
  syncSelectedProjectWithRouter(router);
  router.onHashChange(syncSelectedProjectWithRouter);

  return viewModel;
};

module.exports = Model;
