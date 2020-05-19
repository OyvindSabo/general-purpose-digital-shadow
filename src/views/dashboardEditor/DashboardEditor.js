const DashboardWidgets = include(
  'src/components/dashboardWidgets/DashboardWidgets.js'
);
const CodeEditor = include('src/components/codeEditor/CodeEditor.js');

const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

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

  return Object.assign(element, { key: 'dashboard-editor' });
};

module.exports = DashboardEditor;
