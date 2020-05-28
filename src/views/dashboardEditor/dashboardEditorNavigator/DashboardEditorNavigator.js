const WidgetsPreviewButton = include(
  'src/views/dashboardEditor/dashboardEditorNavigator/widgetsPreviewButton/WidgetsPreviewButton.js'
);
const RawOutputButton = include(
  'src/views/dashboardEditor/dashboardEditorNavigator/rawOutputButton/RawOutputButton.js'
);
const ProblemsButton = include(
  'src/views/dashboardEditor/dashboardEditorNavigator/problemsButton/ProblemsButton.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const DashboardEditorNavigator = (getProps) => {
  const element = compose('div', { style: 'height: 40px;' }, [
    WidgetsPreviewButton(getProps),
    RawOutputButton(getProps),
    ProblemsButton(getProps),
  ]);

  return element;
};

module.exports = DashboardEditorNavigator;
