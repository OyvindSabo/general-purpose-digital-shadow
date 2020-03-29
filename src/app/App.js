const { eq$, or$, slice$ } = include('src/libraries/observable/utils.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');

const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const VerticalNavigator$ = include(
  'src/components/verticalNavigator/VerticalNavigator.js'
);
const ViewContainer$ = include('src/components/viewContainer/ViewContainer.js');
const MainContainer$ = include('src/app/mainContainer/MainContainer.js');
const MainContentContainer$ = include(
  'src/app/mainContentContainer/MainContentContainer.js'
);
const ViewTitle$ = include('src/components/viewTitle/ViewTitle.js');
const Home$ = include('src/views/home/Home.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');
const MainNavigator$ = include('src/app/mainNavigator/MainNavigator.js');

const Values$ = include('src/views/values/Values.js');

const Dashboards$ = include('src/views/dashboards/Dashboards.js');

const { getViewTitle$ } = include('src/app/utils.js');

const App = ({ currentRoute$, model }) => {
  const element = div$(
    HorizontalNavigator$().setStyle({ background: 'black' }),
    MainContainer$(
      MainNavigator$({ currentRoute$ }),
      // Not sure I'm happy about this solution
      MainContentContainer$(
        HorizontalNavigator$(ViewTitle$(getViewTitle$(currentRoute$))).setStyle(
          {
            background: 'white',
            color: 'darkslategray',
          }
        ),
        If$(eq$(currentRoute$, '/'), Home$({ model })),
        If$(
          eq$(slice$(currentRoute$, 0, 28), '/projects/<projectId:string>'),
          VerticalNavigator$()
        ),
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
