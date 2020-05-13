const { textarea } = include('src/libraries/simpleHTML/SimpleHTML.js');
const Widget = include('src/components/widget/Widget.js');
const { defineComponent, div, span } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const CodeEditor = defineComponent((props) => {
  return div(
    { style: { padding: '10px' } },
    textarea({
      ...props,
      style: {
        height: '300px',
        borderRadius: '5px',
        fontFamily: `"Courier New", Courier, monospace`,
        background: 'rgba(0, 0, 0, 0.05)',
        outline: 'none',
        fontSize: '15px',
        padding: '10px',
        border: 'none',
        resize: 'none',
        width: '100%',
        boxShadow: 'inset rgba(0, 0, 0, 0.5) 0 0 10px -5px',
      },
    })
  );
});

const Dashboard = defineComponent(({ state, viewModel }) => {
  const { currentRoute } = state;
  const codeEditorIsOpen =
    currentRoute === '/projects/<projectId:string>/dashboard/edit';

  return div(
    { style: { padding: '10px' } },
    ...[
      codeEditorIsOpen
        ? CodeEditor({
            value: state.selectedWidgetsCode,
            onInput: ({ target }) => {
              viewModel.updateWidgetsCode(
                state.selectedProjectId,
                target.value
              );
            },
          })
        : null,
      ...state.widgets.map(
        ({ type, label, value, surfaces, edges, is3d, center }) => {
          return span(
            { style: { padding: '10px' } },
            Widget({
              type,
              label,
              value,
              surfaces,
              edges,
              is3d,
              center,
            })
          );
        }
      ),
    ].filter(Boolean)
  );
});

module.exports = Dashboard;
