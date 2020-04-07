const { eq$, or$, startsWith$ } = include('src/libraries/observable/utils.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');

const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const ProjectNavigator$ = include(
  'src/views/project/projectNavigator/ProjectNavigator.js'
);
const AppContainer$ = include('src/app/appContainer/AppContainer.js');
const AppContentContainer$ = include(
  'src/app/appContentContainer/AppContentContainer.js'
);
const ProjectContainer$ = include(
  'src/views/project/projectContainer/ProjectContainer.js'
);
const TitleBar$ = include('src/app/titleBar/TitleBar.js');
const Projects$ = include('src/views/projects/Projects.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');
const AppNavigator$ = include('src/app/appNavigator/AppNavigator.js');
const Values$ = include('src/views/values/Values.js');
const Dashboards$ = include('src/views/dashboards/Dashboards.js');

const App = ({ currentRoute$, viewModel }) => {
  return div$(
    HorizontalNavigator$().setStyle({ background: 'black' }),
    AppContainer$(
      AppNavigator$({ currentRoute$ }),
      AppContentContainer$(
        TitleBar$({ currentRoute$, viewModel }),
        If$(eq$(currentRoute$, '/'), Projects$({ viewModel })),
        If$(
          startsWith$(currentRoute$, '/projects/<projectId:string>'),
          ProjectContainer$(
            ProjectNavigator$({ currentRoute$, viewModel }),
            If$(
              or$(
                eq$(currentRoute$, '/projects/<projectId:string>/data-sources'),
                eq$(currentRoute$, '/projects/<projectId:string>')
              ),
              DataSources$({ viewModel })
            ),
            If$(
              startsWith$(currentRoute$, '/projects/<projectId:string>/values'),
              Values$({ viewModel, currentRoute$ })
            ),
            If$(
              startsWith$(
                currentRoute$,
                '/projects/<projectId:string>/dashboards'
              ),
              Dashboards$({ viewModel, currentRoute$ })
            )
          )
        )
      )
    )
  );
};

module.exports = App;
