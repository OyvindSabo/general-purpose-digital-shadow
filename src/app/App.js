const { eq$, or$, startsWith$ } = include('src/libraries/observable/utils.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');
const ProjectNavigator = include(
  'src/views/project/projectNavigator/ProjectNavigator.js'
);
const ProjectContainer = include(
  'src/views/project/projectContainer/ProjectContainer.js'
);
const TitleBar = include('src/app/titleBar/TitleBar.js');
const Projects$ = include('src/views/projects/Projects.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');
const Dashboard = include('src/views/dashboard/Dashboard.js');

const { defineComponent, div } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const App = defineComponent(({ state, viewModel }) => {
  return state.isExported
    ? div(
        TitleBar({ state, viewModel }),
        ProjectContainer$(Dashboard({ state, viewModel }))
      )
    : div(
        ...[
          TitleBar({ state, viewModel }),
          state.currentRoute === '/' ? Projects$({ viewModel }) : null,
          state.currentRoute.indexOf('/projects/<projectId:string>') === 0
            ? ProjectContainer(
                ...[
                  ProjectNavigator({ state }),
                  state.currentRoute ===
                    '/projects/<projectId:string>/data-sources' ||
                  state.currentRoute$ === '/projects/<projectId:string>'
                    ? DataSources$({ viewModel })
                    : null,
                  state.currentRoute.indexOf(
                    '/projects/<projectId:string>/dashboard'
                  ) === 0
                    ? Dashboard({
                        state,
                        viewModel,
                      })
                    : null,
                ].filter(Boolean)
              )
            : null,
        ].filter(Boolean)
      );
});

module.exports = App;
