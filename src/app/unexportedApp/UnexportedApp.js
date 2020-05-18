const ProjectNavigator = include(
  'src/views/project/projectNavigator/ProjectNavigator.js'
);
const ProjectContainer = include(
  'src/views/project/projectContainer/ProjectContainer.js'
);
const TitleBar = include('src/app/titleBar/TitleBar.js');
const Projects = include('src/views/projects/Projects.js');
const DataSources = include('src/views/dataSources/DataSources.js');
const Dashboard = include('src/views/dashboard/Dashboard.js');
const DashboardEditor = include('src/views/dashboardEditor/DashboardEditor.js');

const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const withKey = (element, key) => {
  element.key = key;
  return element;
};

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
  return currentRoute === '/projects/<projectId:string>/dashboard/edit';
};

const isDashboardUrl = (currentRoute) => {
  return currentRoute === '/projects/<projectId:string>/dashboard';
};

// getProps::() => { state, viewModel }
const UnexportedApp = (getProps) => {
  const element = compose('div', {}, () => {
    const { state } = getProps();
    const { currentRoute } = state;
    return [
      withKey(TitleBar(getProps), 'title-bar'),
      isProjectsUrl(currentRoute) && withKey(Projects(getProps), 'projects'),
      hasOpenedProject(currentRoute) &&
        withKey(
          compose('div', {}, () => {
            const { currentRoute } = getProps().state;
            return [
              withKey(ProjectNavigator(getProps), 'project-navigator'),
              isDataSourcesUrl(currentRoute) &&
                withKey(DataSources(getProps), 'data-sources'),
              isDashboardEditorUrl(currentRoute) &&
                withKey(DashboardEditor(getProps), 'dashboard-editor'),
              isDashboardUrl(currentRoute) &&
                withKey(Dashboard(getProps), 'dashboard'),
            ];
          }),
          'opened-project'
        ),
    ];
  });

  return element;
};

module.exports = UnexportedApp;
