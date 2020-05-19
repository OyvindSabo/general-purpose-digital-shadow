const DashboardWidgets = include(
  'src/components/dashboardWidgets/DashboardWidgets.js'
);
const CodeEditor = include('src/components/codeEditor/CodeEditor.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const DashboardEditor = (getProps) => {
  const getViewModel = () => getProps().viewModel;
  const getSelectedProjectId = () => getProps().state.selectedProjectId;
  const getSelectedWidgetsCode = () => getProps().state.selectedWidgetsCode;

  const element = compose('div', { style: 'padding: 10px;' }, [
    CodeEditor(() => ({
      value: getSelectedWidgetsCode(),
      oninput: ({ target }) => {
        getViewModel().updateWidgetsCode(getSelectedProjectId(), target.value);
      },
    })),
    DashboardWidgets(getProps),
  ]);

  return element;
};

module.exports = DashboardEditor;
