const { eq$, or$, startsWith$ } = include('src/libraries/observable/utils.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');
const ProjectNavigator$ = include(
  'src/views/project/projectNavigator/ProjectNavigator.js'
);
const ProjectContainer$ = include(
  'src/views/project/projectContainer/ProjectContainer.js'
);
const TitleBar$ = include('src/app/titleBar/TitleBar.js');
const Projects$ = include('src/views/projects/Projects.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');
const Values$ = include('src/views/values/Values.js');
const Dashboards$ = include('src/views/dashboards/Dashboards.js');

const App = ({ currentRoute$, viewModel }) => {
  return viewModel.isExported
    ? div$(
        TitleBar$({ currentRoute$, viewModel }),
        ProjectContainer$(
          ProjectNavigator$({ currentRoute$, viewModel }),
          If$(
            startsWith$(currentRoute$, '/values'),
            Values$({ viewModel, currentRoute$ })
          ),
          If$(
            or$(
              eq$(currentRoute$, '/'),
              startsWith$(currentRoute$, '/dashboards')
            ),
            Dashboards$({ viewModel, currentRoute$ })
          )
        )
      )
    : div$(
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
      );
};

module.exports = App;
