const CodeEditor$ = include('src/components/codeEditor/CodeEditor.js');
const ExpandCodeEditorButton$ = include(
  'src/components/expandCodeEditorButton/ExpandCodeEditorButton.js'
);
const ValueWidget$ = include('src/components/valueWidget/ValueWidget.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { eq$, choose$ } = include('src/libraries/observable/utils.js');

const Values$ = ({ viewModel, currentRoute$ }) => {
  const codeEditorIsOpen$ = eq$(
    currentRoute$,
    '/projects/<projectId:string>/values/edit'
  );
  return div$(
    ExpandCodeEditorButton$({
      icon: '{}',
      label$: choose$(codeEditorIsOpen$, 'Hide editor', 'Show editor'),
      isOpen$: codeEditorIsOpen$,
    }).onClick(() => {
      location.hash = codeEditorIsOpen$.value
        ? `#!/projects/${viewModel.selectedProjectId$.value}/values`
        : `#!/projects/${viewModel.selectedProjectId$.value}/values/edit`;
    }),
    div$(
      CodeEditor$(viewModel.selectedDerivedValuesCode$)
        .onInput(({ value }) => {
          viewModel.updateDerivedValuesCode(
            viewModel.selectedProjectId$.value,
            value
          );
        })
        .setStyle({ paddingLeft: '80px' })
    ).setStyle({
      display: 'inline-block',
      width: choose$(codeEditorIsOpen$, '50%', '0'),
      transition: '0.5s',
      overflow: 'hidden',
    }),
    div$(
      div$(
        ...viewModel.derivedValues.map(({ label$, value$, isEmpty$ }) =>
          ValueWidget$({ label$, value$, isEmpty$ })
        )
      ).setStyle({ position: 'relative', top: '0' })
    ).setStyle({
      display: 'inline-block',
      position: 'absolute',
      paddingLeft: choose$(codeEditorIsOpen$, '0', '80px'),
      transition: '0.5s',
    })
  ).setStyle({ width: '100%' });
};

module.exports = Values$;
