const NavigatorButton$ = include(
  'src/components/navigatorButton/NavigatorButton.js'
);
const VerticalNavigator$ = include(
  'src/components/verticalNavigator/VerticalNavigator.js'
);
const { eq$, or$, startsWith$ } = include('src/libraries/observable/utils.js');
const { getViewTitle$ } = include('src/app/utils.js');

const ProjectNavigator$ = ({ currentRoute$ }) =>
  VerticalNavigator$(
    NavigatorButton$({
      icon: '🏗',
      label: getViewTitle$('/projects/<projectId:string>/data-sources'),
      route: '/projects/<projectId:string>/data-sources',
      isActive$: or$(
        eq$(currentRoute$, '/projects/<projectId:string>'),
        eq$(currentRoute$, '/projects/<projectId:string>/data-sources')
      ),
      labelColor$: 'lightslategray',
      highlightLabelColor$: 'slategray',
      backgroundColor$: 'white',
      highlightBackgroundColor$: 'whitesmoke',
    }),
    NavigatorButton$({
      icon: '🧮',
      label: getViewTitle$('/projects/<projectId:string>/values'),
      route: '/projects/<projectId:string>/values',
      isActive$: startsWith$(
        currentRoute$,
        '/projects/<projectId:string>/values'
      ),
      labelColor$: 'lightslategray',
      highlightLabelColor$: 'slategray',
      backgroundColor$: 'white',
      highlightBackgroundColor$: 'whitesmoke',
    }),
    NavigatorButton$({
      icon: '📊',
      label: getViewTitle$('/projects/<projectId:string>/dashboards'),
      route: '/projects/<projectId:string>/dashboards',
      isActive$: startsWith$(
        currentRoute$,
        '/projects/<projectId:string>/dashboards'
      ),
      labelColor$: 'lightslategray',
      highlightLabelColor$: 'slategray',
      backgroundColor$: 'white',
      highlightBackgroundColor$: 'whitesmoke',
    })
  );

module.exports = ProjectNavigator$;
