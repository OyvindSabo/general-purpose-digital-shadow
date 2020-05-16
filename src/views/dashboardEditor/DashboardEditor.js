const DashboardWidgets = include(
  'src/components/dashboardWidgets/DashboardWidgets.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const CodeEditor = (getProps) => {
  const element = compose('div', () => ({ style: { padding: '10px' } }), [
    compose(
      'textarea',
      () => {
        const { value, oninput } = getProps();
        return {
          oninput,
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
          value,
        };
      },
      []
    ),
  ]);
  element.update = ({ value, oninput }) => {
    element.childNodes[0].value = value;
    element.childNodes[0].oninput = oninput;
  };
  return element;
};

// getProps::() => { state, viewModel }
const DashboardEditor = (getProps) => {
  const { state, viewModel } = getProps();
  const value = state.selectedWidgetsCode;
  const oninput = ({ target }) => {
    viewModel.updateWidgetsCode(state.selectedProjectId, target.value);
  };

  const element = compose('div', () => ({ style: { padding: '10px' } }), [
    CodeEditor(() => ({ value, oninput })),
    DashboardWidgets(getProps),
  ]);

  return element;
};

module.exports = DashboardEditor;
