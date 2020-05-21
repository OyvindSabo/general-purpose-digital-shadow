const {
  getExportedProject,
  getAllProjects,
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
    setTimeout(() => {
      fetchDataFromApi();
      repeatedlyFetchDataFromApi(state.selectedApiInterval);
    }, 1000);
  };

  viewModel.updateApiInterval = (projectId, apiInterval) => {
    updateProjectById(projectId, { apiInterval });
    viewModel.loadAllProjects();
    setTimeout(() => {
      fetchDataFromApi();
      repeatedlyFetchDataFromApi(state.selectedApiInterval);
    }, 1000);
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

  const evaluatedCodeIsValid = (evaluatedCode) => {
    return evaluatedCode.every((widget) => typeof widget === 'object');
  };

  const updateValues = () => {
    let evaluatedCode;
    try {
      evaluatedCode = evaluateCode(
        state.apiResponse,
        state.selectedWidgetsCode
      );
    } catch (e) {
      console.warn('Failed to evaluate code: ', e);
      evaluatedCode = [];
    }
    if (evaluatedCodeIsValid(evaluatedCode)) {
      setState({
        widgets: evaluatedCode,
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

  const syncSelectedProjectWithRouter = ({ params, currentRoute }) => {
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
      }
      if (currentRoute === '/projects/<projectId:string>/dashboard') {
        setState({
          currentRoute,
          params,
          lastVisitedProjectView: 'dashboard',
        });
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
