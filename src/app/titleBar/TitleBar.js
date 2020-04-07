const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { ViewTitle$ } = include('src/app/titleBar/atoms.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { add$, startsWith$, choose$ } = include(
  'src/libraries/observable/utils.js'
);
const { span$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const TitleBar$ = ({ currentRoute$, viewModel }) => {
  return withShadow(HorizontalNavigator$)(
    ViewTitle$(
      span$('Projects').onClick(() => (location.hash = '#!/projects')),
      span$(
        choose$(
          viewModel.selectedProjectName$,
          add$(' / ', viewModel.selectedProjectName$),
          ''
        )
      )
        .setStyle({
          color: choose$(
            startsWith$(currentRoute$, '/projects/<projectId:string>'),
            'darkslategray',
            'lightgray'
          ),
        })
        .onClick(
          () =>
            (location.hash = `#!/projects/${
              viewModel.selectedProjectId$.value
            }/${viewModel.lastVisitedProjectView$.value || ''}`)
        )
    )
  ).setStyle({
    background: 'white',
    color: 'darkslategray',
  });
};

module.exports = TitleBar$;
