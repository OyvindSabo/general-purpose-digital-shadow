const DashboardWidgets = include(
  'src/components/dashboardWidgets/DashboardWidgets.js'
);
const DashboardEditorNavigator = include(
  'src/views/dashboardEditor/dashboardEditorNavigator/DashboardEditorNavigator.js'
);
const CodeEditor = include('src/components/codeEditor/CodeEditor.js');
const CodePreview = include('src/components/codePreview/CodePreview.js');
const { compose, Each, If } = include('src/libraries/simpleHTML/SimpleHTML.js');
const { Colors } = include('src/libraries/simpleUI/Constants.js');

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
      compose(
        'div',
        {
          style: `color: ${Colors.TextColor}; padding: 10px;`,
          innerText:
            'One unit in the Euclidean space corresponds to 1px in the widget (for 3D widgets the resulting unit size will depend on the camera distance).',
        },
        [
          compose('ul', {}, [
            compose('li', { innerText: 'Widget width: 480px' }, []),
            compose('li', { innerText: 'Widget height: 320px' }, []),
          ]),
        ]
      ),
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
        () => [
          If(
            () => getProps().state.widgetsCodeErrors.length,
            () => [
              Each(
                () => getProps().state.widgetsCodeErrors,
                (getValue) =>
                  compose(
                    'div',
                    {
                      innerText: getValue(),
                      style: `box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
                              font-family: "Courier New", Courier, monospace;
                              background: lightpink;
                              box-sizing: border-box;
                              display: inline-block;
                              white-space: pre-wrap;
                              border-radius: 5px;
                              line-height: 40px;
                              max-height: 300px;
                              min-height: 40px;
                              font-size: 15px;
                              overflow: auto;
                              outline: none;
                              padding: 10px;
                              border: none;
                              resize: none;
                              width: 100%;`,
                    },
                    []
                  )
              ),
            ],
            () => [
              compose('div', { innerText: 'No problems were detected.' }, []),
            ]
          ),
        ]
      ),
    ]),
  ]);

  return element;
};

module.exports = DashboardEditor;
