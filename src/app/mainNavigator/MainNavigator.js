const LeftNavigatorButton$ = include(
  'src/components/leftNavigatorButton/LeftNavigatorButton.js'
);
const VerticalNavigator$ = include(
  'src/components/verticalNavigator/VerticalNavigator.js'
);
const { eq$, or$ } = include('src/libraries/observable/utils.js');
const { getViewTitle$ } = include('src/app/utils.js');

const MainNavigator$ = ({ currentRoute$ }) =>
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
  ).setStyle({ background: 'lightslategrey' });

module.exports = MainNavigator$;
