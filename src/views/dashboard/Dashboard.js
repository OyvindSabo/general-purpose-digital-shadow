const CodeEditor$ = include('src/components/codeEditor/CodeEditor.js');
const ExpandCodeEditorButton$ = include(
  'src/components/expandCodeEditorButton/ExpandCodeEditorButton.js'
);
const CanvasWidget$ = include('src/components/canvasWidget/CanvasWidget.js');
const ValueWidget$ = include('src/components/valueWidget/ValueWidget.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { eq$, choose$, not$ } = include('src/libraries/observable/utils.js');
const { If$, Choose$ } = include('src/libraries/observableHtml/utils.js');

const Dashboard$ = ({ viewModel, currentRoute$ }) => {
  const { isExported } = viewModel;
  const codeEditorIsOpen$ = eq$(
    currentRoute$,
    '/projects/<projectId:string>/dashboard/edit'
  );
  return div$(
    If$(
      not$(isExported),
      ExpandCodeEditorButton$({
        icon: '+',
        label$: choose$(codeEditorIsOpen$, 'Hide editor', 'Show editor'),
        isOpen$: codeEditorIsOpen$,
      }).onClick(() => {
        location.hash = codeEditorIsOpen$.value
          ? `#!/projects/${viewModel.selectedProjectId$.value}/dashboard`
          : `#!/projects/${viewModel.selectedProjectId$.value}/dashboard/edit`;
      })
    ),
    div$(
      CodeEditor$(viewModel.selectedWidgetsCode$)
        .onInput(({ value }) => {
          viewModel.updateWidgetsCode(
            viewModel.selectedProjectId$.value,
            value
          );
        })
        .setStyle({ margin: '32px 0 0 96px' })
    ).setStyle({
      display: 'inline-block',
      width: choose$(codeEditorIsOpen$, '50%', '0'),
      transition: '0.5s',
      height: 'calc(100% - 96px)',
      overflow: 'hidden',
    }),
    div$(
      div$(
        ...viewModel.widgets.map(
          ({
            label$,
            type$,
            value$,
            surfaces$,
            edges$,
            is3d$,
            center$,
            isEmpty$,
          }) =>
            Choose$(
              eq$(type$, 'canvas-widget'),
              CanvasWidget$({
                label$,
                type$,
                value$,
                surfaces$,
                edges$,
                is3d$,
                center$,
                isEmpty$,
              }),
              // eq$(type$, 'number-widget')
              ValueWidget$({ label$, value$, isEmpty$ })
            )
        )
      ).setStyle({
        position: 'relative',
        top: '0',
      })
    ).setStyle({
      display: 'inline-block',
      position: 'absolute',
      paddingLeft: choose$(codeEditorIsOpen$, '0', isExported ? '0' : '64px'),
      transition: '0.5s',
      height: 'calc(100% - 64px)',
      overflowY: 'auto',
    })
  ).setStyle({ width: '100%' });
};

module.exports = Dashboard$;
