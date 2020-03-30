const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { ViewTitle$ } = include('src/app/titleBar/atoms.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { add$, startsWith$, choose$ } = include(
  'src/libraries/observable/utils.js'
);
const { span$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const TitleBar$ = ({ currentRoute$, model }) => {
  return withShadow(HorizontalNavigator$)(
    ViewTitle$(
      span$('Projects').onClick(() => (location.hash = '#!/projects')),
      span$(
        choose$(
          model.selectedProjectName$,
          add$(' / ', model.selectedProjectName$),
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
              model.selectedProjectId$.value
            }/${model.lastVisitedProjectView$.value || ''}`)
        )
    )
  ).setStyle({
    background: 'white',
    color: 'darkslategray',
  });
};

module.exports = TitleBar$;
