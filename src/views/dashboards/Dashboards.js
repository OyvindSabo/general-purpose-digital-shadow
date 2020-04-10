const CodeEditor$ = include('src/components/codeEditor/CodeEditor.js');
const ExpandCodeEditorButton$ = include(
  'src/components/expandCodeEditorButton/ExpandCodeEditorButton.js'
);
const CanvasWidget$ = include('src/components/canvasWidget/CanvasWidget.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { eq$, choose$ } = include('src/libraries/observable/utils.js');

const Dashboards$ = ({ viewModel, currentRoute$ }) => {
  const codeEditorIsOpen$ = eq$(
    currentRoute$,
    '/projects/<projectId:string>/dashboards/edit'
  );
  return div$(
    ExpandCodeEditorButton$({
      icon: '+',
      label$: choose$(codeEditorIsOpen$, 'Hide editor', 'Show editor'),
      isOpen$: codeEditorIsOpen$,
    }).onClick(() => {
      location.hash = codeEditorIsOpen$.value
        ? `#!/projects/${viewModel.selectedProjectId$.value}/dashboards`
        : `#!/projects/${viewModel.selectedProjectId$.value}/dashboards/edit`;
    }),
    div$(
      CodeEditor$(viewModel.selectedWidgetsCode$)
        .onInput(({ value }) => {
          viewModel.updateWidgetsCode(
            viewModel.selectedProjectId$.value,
            value
          );
        })
        .setStyle({ marginLeft: '96px' })
    ).setStyle({
      display: 'inline-block',
      width: choose$(codeEditorIsOpen$, '50%', '0'),
      transition: '0.5s',
      height: 'calc(100% - 64px)',
      overflow: 'hidden',
    }),
    div$(
      div$(
        ...viewModel.widgets.map(
          ({ label$, surfaces$, edges$, is3d$, center$, isEmpty$ }) =>
            CanvasWidget$({
              label$,
              surfaces$,
              edges$,
              is3d$,
              center$,
              isEmpty$,
            })
        )
      ).setStyle({
        position: 'relative',
        top: '0',
      })
    ).setStyle({
      display: 'inline-block',
      position: 'absolute',
      paddingLeft: choose$(codeEditorIsOpen$, '0', '64px'),
      transition: '0.5s',
    })
  ).setStyle({ width: '100%' });
};

module.exports = Dashboards$;
