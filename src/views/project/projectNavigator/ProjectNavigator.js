const HorizontalNavigatorButton$ = include(
  'src/components/horizontalNavigatorButton/HorizontalNavigatorButton.js'
);
const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { choose$, eq$, not$, or$, startsWith$, add$ } = include(
  'src/libraries/observable/utils.js'
);
const { getViewTitle$ } = include('src/app/utils.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');

const ProjectNavigator$ = ({ currentRoute$, viewModel }) => {
  const { isExported } = viewModel;
  return HorizontalNavigator$(
    If$(
      not$(isExported),
      HorizontalNavigatorButton$({
        label: getViewTitle$('/projects/<projectId:string>/data-sources'),
        route$: add$(
          '/projects/',
          viewModel.selectedProjectId$,
          '/data-sources'
        ),
        isActive$: or$(
          eq$(currentRoute$, '/projects/<projectId:string>'),
          eq$(currentRoute$, '/projects/<projectId:string>/data-sources')
        ),
        labelColor$: 'slategray',
        highlightLabelColor$: 'darkslategray',
      })
    ),
    HorizontalNavigatorButton$({
      label: getViewTitle$('/projects/<projectId:string>/values'),
      route$: isExported
        ? '/values'
        : add$('/projects/', viewModel.selectedProjectId$, '/values'),
      isActive$: isExported
        ? eq$(currentRoute$, '/values')
        : startsWith$(currentRoute$, '/projects/<projectId:string>/values'),
      labelColor$: 'slategray',
      highlightLabelColor$: 'darkslategray',
    }),
    HorizontalNavigatorButton$({
      label: getViewTitle$('/projects/<projectId:string>/dashboards'),
      route$: isExported
        ? '/dashboards'
        : add$('/projects/', viewModel.selectedProjectId$, '/dashboards'),
      isActive$: isExported
        ? or$(eq$(currentRoute$, '/'), eq$(currentRoute$, '/dashboards'))
        : startsWith$(currentRoute$, '/projects/<projectId:string>/dashboards'),
      labelColor$: 'slategray',
      highlightLabelColor$: 'darkslategray',
    })
  );
};

module.exports = ProjectNavigator$;
