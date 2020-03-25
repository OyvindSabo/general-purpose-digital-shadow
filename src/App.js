const { eq$, or$ } = include('src/libraries/observable/utils.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');

const TopNavigator$ = include('src/components/topNavigator/TopNavigator.js');
const LeftNavigatorButton$ = include(
  'src/components/leftNavigatorButton/LeftNavigatorButton.js'
);
const LeftNavigator$ = include('src/components/leftNavigator/LeftNavigator.js');
const ViewContainer$ = include('src/components/viewContainer/ViewContainer.js');
const MainContainer$ = include('src/components/mainContainer/MainContainer.js');
const Home$ = include('src/views/home/Home.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');
const AlertsView$ = () => div$('AlertsView');

const Values$ = include('src/views/values/Values.js');

const Dashboards$ = include('src/views/dashboards/Dashboards.js');

const App = ({ params, currentRoute$, state }) => {
  const element = div$(
    TopNavigator$(),
    MainContainer$(
      LeftNavigator$(
        // Add something for home as well
        LeftNavigatorButton$({
          icon: '🏗',
          label: 'Data sources',
          route: '/data-sources',
          isActive$: eq$(currentRoute$, '/data-sources'),
        }),
        LeftNavigatorButton$({
          icon: '🧮',
          label: 'Values',
          route: '/values',
          isActive$: or$(
            eq$(currentRoute$, '/values'),
            eq$(currentRoute$, '/values/edit')
          ),
        }),
        LeftNavigatorButton$({
          icon: '📊',
          label: 'Dashboards',
          route: '/dashboards',
          isActive$: or$(
            eq$(currentRoute$, '/dashboards'),
            eq$(currentRoute$, '/dashboards/edit')
          ),
        }),
        LeftNavigatorButton$({
          icon: '⏰',
          label: 'Alerts',
          route: '/alerts',
          isActive$: eq$(currentRoute$, '/alerts'),
        })
      ),
      // Not sure I'm happy about this solution
      ViewContainer$(
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
