const DashboardWidgets = include(
  'src/components/dashboardWidgets/DashboardWidgets.js'
);
const DashboardEditorNavigator = include(
  'src/views/dashboardEditor/dashboardEditorNavigator/DashboardEditorNavigator.js'
);
const CodeEditor = include('src/components/codeEditor/CodeEditor.js');
const CodePreview = include('src/components/codePreview/CodePreview.js');
const { compose, If } = include('src/libraries/simpleHTML/SimpleHTML.js');

const isWidgetsPreviewUrl = (currentRoute) => {
  return (
    currentRoute === '/projects/<projectId:string>/dashboard-editor' ||
    currentRoute ===
      '/projects/<projectId:string>/dashboard-editor/widgets-preview'
  );
};

const isRawOutputUrl = (currentRoute) => {
  return (
    currentRoute === '/projects/<projectId:string>/dashboard-editor/raw-output'
  );
};

const isProblemsUrl = (currentRoute) => {
  return (
    currentRoute === '/projects/<projectId:string>/dashboard-editor/problems'
  );
};

const DashboardEditor = (getProps) => {
  const getViewModel = () => getProps().viewModel;
  const getCurrentRoute = () => getProps().state.currentRoute;
  const getSelectedProjectId = () => getProps().state.selectedProjectId;
  const getSelectedWidgetsCode = () => getProps().state.selectedWidgetsCode;

  const element = compose('div', {}, [
    compose('div', { style: 'padding: 10px;' }, [
      CodeEditor(() => ({
        value: getSelectedWidgetsCode(),
        oninput: ({ target }) => {
          getViewModel().updateWidgetsCode(
            getSelectedProjectId(),
            target.value
          );
        },
      })),
    ]),
    DashboardEditorNavigator(getProps),
    compose('div', { style: 'padding: 20px;' }, [
      If(
        () => isWidgetsPreviewUrl(getCurrentRoute()),
        () => [DashboardWidgets(getProps)]
      ),
      If(
        () => isRawOutputUrl(getCurrentRoute()),
        () => [
          CodePreview(
            () => ({ innerText: getProps().state.widgetsCodeRawOutput }),
            []
          ),
        ]
      ),
      If(
        () => isProblemsUrl(getCurrentRoute()),
        () => [compose('div', { innerText: 'Problems' }, [])]
      ),
    ]),
  ]);

  return element;
};

module.exports = DashboardEditor;
