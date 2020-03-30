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

const App = ({ currentRoute$, model }) => {
  return div$(
    HorizontalNavigator$().setStyle({ background: 'black' }),
    AppContainer$(
      AppNavigator$({ currentRoute$ }),
      AppContentContainer$(
        TitleBar$({ currentRoute$, model }),
        If$(eq$(currentRoute$, '/'), Projects$({ model })),
        If$(
          startsWith$(currentRoute$, '/projects/<projectId:string>'),
          ProjectContainer$(
            ProjectNavigator$({ currentRoute$, model }),
            If$(
              or$(
                eq$(currentRoute$, '/projects/<projectId:string>/data-sources'),
                eq$(currentRoute$, '/projects/<projectId:string>')
              ),
              DataSources$()
            ),
            If$(
              startsWith$(currentRoute$, '/projects/<projectId:string>/values'),
              Values$({ model, currentRoute$ })
            ),
            If$(
              startsWith$(
                currentRoute$,
                '/projects/<projectId:string>/dashboards'
              ),
              Dashboards$({ model, currentRoute$ })
            )
          )
        )
      )
    )
  );
};

module.exports = App;
