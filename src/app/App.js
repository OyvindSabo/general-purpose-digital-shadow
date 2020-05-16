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

// getProps::() => { state, viewModel }
const App = (getProps) => {
  const { state } = getProps();
  console.log('getProps().state.currentRoute: ', getProps().state.currentRoute);
  const element = state.isExported
    ? compose('div', () => ({}), [
        TitleBar(getProps),
        ProjectContainer({}, [Dashboard(getProps)]),
      ])
    : compose('div', () => ({}), [
        TitleBar(getProps),
        getProps().state.currentRoute === '/' ? Projects(getProps) : null,
        getProps().state.currentRoute.indexOf(
          '/projects/<projectId:string>'
        ) === 0
          ? ProjectContainer(() => ({}), [
              ProjectNavigator(() => ({ state: getProps().state })),
              state.currentRoute ===
                '/projects/<projectId:string>/data-sources' ||
              state.currentRoute === '/projects/<projectId:string>'
                ? DataSources(getProps)
                : null,
              state.currentRoute ===
              '/projects/<projectId:string>/dashboard/edit'
                ? DashboardEditor(getProps)
                : null,
              state.currentRoute === '/projects/<projectId:string>/dashboard'
                ? Dashboard(getProps)
                : null,
            ])
          : null,
      ]);
  // TODO: Add some custom update logic to make sure children are replaced if route changes
  return element;
};

module.exports = App;
