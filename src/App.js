const { cond$, eq$, or$, slice$ } = include(
  'src/libraries/observable/utils.js'
);
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');

const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const LeftNavigatorButton$ = include(
  'src/components/leftNavigatorButton/LeftNavigatorButton.js'
);
const VerticalNavigator$ = include(
  'src/components/verticalNavigator/VerticalNavigator.js'
);
const ViewContainer$ = include('src/components/viewContainer/ViewContainer.js');
const MainContainer$ = include('src/components/mainContainer/MainContainer.js');
const ViewTitle$ = include('src/components/viewTitle/ViewTitle.js');
const Home$ = include('src/views/home/Home.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');

const Values$ = include('src/views/values/Values.js');

const Dashboards$ = include('src/views/dashboards/Dashboards.js');

const getViewTitle$ = currentRoute$ =>
  cond$(
    [eq$(currentRoute$, '/'), 'Projects'],
    [eq$(currentRoute$, '/projects/<projectId:string>'), 'Data sources'],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/data-sources'),
      'Data sources',
    ],
    [eq$(currentRoute$, '/projects/<projectId:string>/values'), 'Values'],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/values/edit'),
      'Edit values',
    ],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/dashboards'),
      'Dashboards',
    ],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/dashboards/edit'),
      'Edit dashboards',
    ]
  );

const App = ({ currentRoute$, model }) => {
  const element = div$(
    HorizontalNavigator$().setStyle({ background: 'black' }),
    MainContainer$(
      VerticalNavigator$(
        LeftNavigatorButton$({
          icon: '🏠',
          label: getViewTitle$('/'),
          route: '/',
          isActive$: eq$(currentRoute$, '/'),
          labelColor$: 'whitesmoke',
          highlightLabelColor$: 'white',
          backgroundColor$: 'lightslategray',
          highlightBackgroundColor$: 'slategray',
        }),
        LeftNavigatorButton$({
          icon: '🏗',
          label: getViewTitle$('/projects/<projectId:string>/data-sources'),
          route: '/projects/<projectId:string>/data-sources',
          isActive$: or$(
            eq$(currentRoute$, '/projects/<projectId:string>'),
            eq$(currentRoute$, '/projects/<projectId:string>/data-sources')
          ),
          labelColor$: 'whitesmoke',
          highlightLabelColor$: 'white',
          backgroundColor$: 'lightslategray',
          highlightBackgroundColor$: 'slategray',
        }),
        LeftNavigatorButton$({
          icon: '🧮',
          label: getViewTitle$('/projects/<projectId:string>/values'),
          route: '/projects/<projectId:string>/values',
          isActive$: or$(
            eq$(currentRoute$, '/projects/<projectId:string>/values'),
            eq$(currentRoute$, '/projects/<projectId:string>/values/edit')
          ),
          labelColor$: 'whitesmoke',
          highlightLabelColor$: 'white',
          backgroundColor$: 'lightslategray',
          highlightBackgroundColor$: 'slategray',
        }),
        LeftNavigatorButton$({
          icon: '📊',
          label: getViewTitle$('/projects/<projectId:string>/dashboards'),
          route: '/projects/<projectId:string>/dashboards',
          isActive$: or$(
            eq$(currentRoute$, '/projects/<projectId:string>/dashboards'),
            eq$(currentRoute$, '/projects/<projectId:string>/dashboards/edit')
          ),
          labelColor$: 'whitesmoke',
          highlightLabelColor$: 'white',
          backgroundColor$: 'lightslategray',
          highlightBackgroundColor$: 'slategray',
        })
      ).setStyle({ background: 'lightslategrey' }),
      // Not sure I'm happy about this solution
      ViewContainer$(
        HorizontalNavigator$(ViewTitle$(getViewTitle$(currentRoute$))).setStyle(
          {
            background: 'white',
            color: 'darkslategray',
          }
        ),
        If$(eq$(currentRoute$, '/'), Home$({ model })),
        //If$(eq$(currentRoute$,))
        If$(
          or$(
            eq$(currentRoute$, '/projects/<projectId:string>/data-sources'),
            eq$(currentRoute$, '/projects/<projectId:string>')
          ),
          DataSources$()
        ),
        If$(
          or$(
            eq$(currentRoute$, '/projects/<projectId:string>/values'), // Hack, for some reason the code editor animation doesn't work without this
            eq$(currentRoute$, '/projects/<projectId:string>/values/edit'),
            eq$(currentRoute$, '/projects/<projectId:string>/values')
          ),
          Values$({ model, currentRoute$ })
        ),
        If$(
          or$(
            eq$(currentRoute$, '/projects/<projectId:string>/dashboards'), // Hack, for some reason the code editor animation doesn't work without this
            eq$(currentRoute$, '/projects/<projectId:string>/dashboards/edit'),
            eq$(currentRoute$, '/projects/<projectId:string>/dashboards')
          ),
          Dashboards$({ model, currentRoute$ })
        )
      )
    )
  );

  return element;
};

module.exports = App;
