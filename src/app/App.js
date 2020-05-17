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

// getProps::() => { state, viewModel }
const App = (getProps) => {
  const { state } = getProps();
  const element = state.isExported
    ? compose('div', {}, [
        TitleBar(getProps),
        ProjectContainer({}, [Dashboard(getProps)]),
      ])
    : compose('div', {}, [
        withKey(TitleBar(getProps), 'title-bar'),
        getProps().state.currentRoute === '/'
          ? withKey(Projects(getProps), 'projects')
          : null,
        getProps().state.currentRoute.indexOf(
          '/projects/<projectId:string>'
        ) === 0
          ? withKey(
              ProjectContainer(getProps, [
                withKey(ProjectNavigator(getProps), 'project-navigator'),
                state.currentRoute ===
                  '/projects/<projectId:string>/data-sources' ||
                state.currentRoute === '/projects/<projectId:string>'
                  ? withKey(DataSources(getProps), 'data-sources')
                  : null,
                state.currentRoute ===
                '/projects/<projectId:string>/dashboard/edit'
                  ? withKey(DashboardEditor(getProps), 'dashboard-editor')
                  : null,
                state.currentRoute === '/projects/<projectId:string>/dashboard'
                  ? withKey(Dashboard(getProps), 'dashboard')
                  : null,
              ]),
              'project-container'
            )
          : null,
      ]);

  return element;
};

module.exports = App;
