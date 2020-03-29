const LeftNavigatorButton$ = include(
  'src/components/leftNavigatorButton/LeftNavigatorButton.js'
);
const VerticalNavigator$ = include(
  'src/components/verticalNavigator/VerticalNavigator.js'
);
const { eq$ } = include('src/libraries/observable/utils.js');
const { getViewTitle$ } = include('src/app/utils.js');

const AppNavigator$ = ({ currentRoute$ }) =>
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
    })
  ).setStyle({ background: 'lightslategrey' });

module.exports = AppNavigator$;
