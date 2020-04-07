const HorizontalNavigatorButton$ = include(
  'src/components/horizontalNavigatorButton/HorizontalNavigatorButton.js'
);
const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { eq$, or$, startsWith$, add$ } = include(
  'src/libraries/observable/utils.js'
);
const { getViewTitle$ } = include('src/app/utils.js');

const ProjectNavigator$ = ({ currentRoute$, viewModel }) =>
  HorizontalNavigator$(
    HorizontalNavigatorButton$({
      label: getViewTitle$('/projects/<projectId:string>/data-sources'),
      route$: add$('/projects/', viewModel.selectedProjectId$, '/data-sources'),
      isActive$: or$(
        eq$(currentRoute$, '/projects/<projectId:string>'),
        eq$(currentRoute$, '/projects/<projectId:string>/data-sources')
      ),
      labelColor$: 'slategray',
      highlightLabelColor$: 'darkslategray',
    }),
    HorizontalNavigatorButton$({
      label: getViewTitle$('/projects/<projectId:string>/values'),
      route$: add$('/projects/', viewModel.selectedProjectId$, '/values'),
      isActive$: startsWith$(
        currentRoute$,
        '/projects/<projectId:string>/values'
      ),
      labelColor$: 'slategray',
      highlightLabelColor$: 'darkslategray',
    }),
    HorizontalNavigatorButton$({
      label: getViewTitle$('/projects/<projectId:string>/dashboards'),
      route$: add$('/projects/', viewModel.selectedProjectId$, '/dashboards'),
      isActive$: startsWith$(
        currentRoute$,
        '/projects/<projectId:string>/dashboards'
      ),
      labelColor$: 'slategray',
      highlightLabelColor$: 'darkslategray',
    })
  );

module.exports = ProjectNavigator$;
