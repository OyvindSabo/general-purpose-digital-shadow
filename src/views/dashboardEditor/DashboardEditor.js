const DashboardWidgets = include(
  'src/components/dashboardWidgets/DashboardWidgets.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const withKey = (element, key) => {
  element.key = key;
  return element;
};

const CodeEditor = (getProps) => {
  const element = compose('div', { style: 'padding: 10px;' }, [
    compose(
      'textarea',
      () => {
        const { value, oninput } = getProps();
        return {
          oninput,
          style: `height: 300px;
                  border-radius: 5px;
                  font-family: "Courier New", Courier, monospace;
                  background: rgba(0, 0, 0, 0.05);
                  outline: none;
                  font-size: 15px;
                  padding: 10px;
                  border: none;
                  resize: none;
                  width: 100%;
                  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;`,
          value,
        };
      },
      []
    ),
  ]);
  return element;
};

// getProps::() => { state, viewModel }
const DashboardEditor = (getProps) => {
  const element = compose('div', { style: 'padding: 10px;' }, [
    CodeEditor(() => {
      const { state, viewModel } = getProps();
      const oninput = ({ target }) => {
        viewModel.updateWidgetsCode(state.selectedProjectId, target.value);
      };
      return { value: state.selectedWidgetsCode, oninput };
    }),
    DashboardWidgets(getProps),
  ]);

  return element;
};

module.exports = DashboardEditor;
