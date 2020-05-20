const ProjectNavigator = include(
  'src/views/project/projectNavigator/ProjectNavigator.js'
);
const TitleBar = include('src/app/titleBar/TitleBar.js');
const Projects = include('src/views/projects/Projects.js');
const DataSources = include('src/views/dataSources/DataSources.js');
const Dashboard = include('src/views/dashboard/Dashboard.js');
const DashboardEditor = include('src/views/dashboardEditor/DashboardEditor.js');

const { compose, If } = include('src/libraries/simpleHTML/SimpleHTML.js');

const isProjectsUrl = (currentRoute) => {
  return currentRoute === '/';
};

const hasOpenedProject = (currentRoute) => {
  return currentRoute.indexOf('/projects/<projectId:string>') === 0;
};

const isDataSourcesUrl = (currentRoute) => {
  return (
    currentRoute === '/projects/<projectId:string>/data-sources' ||
    currentRoute === '/projects/<projectId:string>'
  );
};

const isDashboardEditorUrl = (currentRoute) => {
  return currentRoute === '/projects/<projectId:string>/dashboard-editor';
};

const isDashboardUrl = (currentRoute) => {
  return currentRoute === '/projects/<projectId:string>/dashboard';
};

// getProps::() => { state, viewModel }
const UnexportedApp = (getProps) => {
  const getCurrentRoute = () => getProps().state.currentRoute;
  const element = compose('div', {}, [
    TitleBar(getProps),
    If(
      () => isProjectsUrl(getCurrentRoute()),
      () => [Projects(getProps)]
    ),
    If(
      () => hasOpenedProject(getCurrentRoute()),
      () => [
        compose('div', {}, [
          ProjectNavigator(getProps),
          If(
            () => isDataSourcesUrl(getCurrentRoute()),
            () => [DataSources(getProps)]
          ),
          If(
            () => isDashboardEditorUrl(getCurrentRoute()),
            () => [DashboardEditor(getProps)]
          ),
          If(
            () => isDashboardUrl(getCurrentRoute()),
            () => [Dashboard(getProps)]
          ),
        ]),
      ]
    ),
  ]);

  return element;
};

module.exports = UnexportedApp;
