const { cond$, eq$, or$ } = include('src/libraries/observable/utils.js');
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
const AlertsView$ = () => div$('AlertsView');

const Values$ = include('src/views/values/Values.js');

const Dashboards$ = include('src/views/dashboards/Dashboards.js');

const getViewTitle$ = currentRoute$ =>
  cond$(
    [eq$(currentRoute$, '/'), 'Home'],
    [eq$(currentRoute$, '/data-sources'), 'Data sources'],
    [eq$(currentRoute$, '/values'), 'Values'],
    [eq$(currentRoute$, '/dashboards'), 'Dashboards'],
    [eq$(currentRoute$, '/dashboards/edit'), 'Edit dashboard'],
    [eq$(currentRoute$, '/alerts'), 'Alerts']
  );

const App = ({ params, currentRoute$, state }) => {
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
          label: getViewTitle$('/data-sources'),
          route: '/data-sources',
          isActive$: eq$(currentRoute$, '/data-sources'),
          labelColor$: 'whitesmoke',
          highlightLabelColor$: 'white',
          backgroundColor$: 'lightslategray',
          highlightBackgroundColor$: 'slategray',
        }),
        LeftNavigatorButton$({
          icon: '🧮',
          label: getViewTitle$('/values'),
          route: '/values',
          isActive$: or$(
            eq$(currentRoute$, '/values'),
            eq$(currentRoute$, '/values/edit')
          ),
          labelColor$: 'whitesmoke',
          highlightLabelColor$: 'white',
          backgroundColor$: 'lightslategray',
          highlightBackgroundColor$: 'slategray',
        }),
        LeftNavigatorButton$({
          icon: '📊',
          label: getViewTitle$('/dashboards'),
          route: '/dashboards',
          isActive$: or$(
            eq$(currentRoute$, '/dashboards'),
            eq$(currentRoute$, '/dashboards/edit')
          ),
          labelColor$: 'whitesmoke',
          highlightLabelColor$: 'white',
          backgroundColor$: 'lightslategray',
          highlightBackgroundColor$: 'slategray',
        }),
        LeftNavigatorButton$({
          icon: '⏰',
          label: getViewTitle$('/alerts'),
          route: '/alerts',
          isActive$: eq$(currentRoute$, '/alerts'),
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
          }
        ),
        If$(eq$(currentRoute$, '/'), Home$()),
        If$(eq$(currentRoute$, '/data-sources'), DataSources$()),
        If$(
          or$(
            eq$(currentRoute$, '/values'), // Hack, for some reason the code editor animation doesn't work without this
            eq$(currentRoute$, '/values/edit'),
            eq$(currentRoute$, '/values')
          ),
          Values$({ state, currentRoute$ })
        ),
        If$(
          or$(
            eq$(currentRoute$, '/dashboards'), // Hack, for some reason the code editor animation doesn't work without this
            eq$(currentRoute$, '/dashboards/edit'),
            eq$(currentRoute$, '/dashboards')
          ),
          Dashboards$({ state, currentRoute$ })
        ),
        If$(eq$(currentRoute$, '/alerts'), AlertsView$())
      )
    )
  );

  return element;
};

module.exports = App;
