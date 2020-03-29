const { eq$, or$, startsWith$ } = include('src/libraries/observable/utils.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');

const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const VerticalNavigator$ = include(
  'src/components/verticalNavigator/VerticalNavigator.js'
);
const MainContainer$ = include('src/app/mainContainer/MainContainer.js');
const MainContentContainer$ = include(
  'src/app/mainContentContainer/MainContentContainer.js'
);
const ProjectContainer$ = include(
  'src/views/project/projectContainer/ProjectContainer.js'
);
const TitleBar$ = include('src/app/titleBar/TitleBar.js');
const Projects$ = include('src/views/projects/Projects.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');
const MainNavigator$ = include('src/app/mainNavigator/MainNavigator.js');
const Values$ = include('src/views/values/Values.js');
const Dashboards$ = include('src/views/dashboards/Dashboards.js');

const App = ({ currentRoute$, model }) => {
  const element = div$(
    HorizontalNavigator$().setStyle({ background: 'black' }),
    MainContainer$(
      MainNavigator$({ currentRoute$ }),
      MainContentContainer$(
        TitleBar$({ currentRoute$ }),
        If$(eq$(currentRoute$, '/'), Projects$({ model })),
        If$(
          startsWith$(currentRoute$, '/projects/<projectId:string>'),
          ProjectContainer$(
            VerticalNavigator$(),
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

  return element;
};

module.exports = App;
