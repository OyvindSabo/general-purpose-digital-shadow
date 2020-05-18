const DataSourcesButton = include(
  'src/views/project/projectNavigator/dataSourcesButton/DataSourcesButton.js'
);
const DashboardEditorButton = include(
  'src/views/project/projectNavigator/dashboardEditorButton/DashboardEditorButton.js'
);
const DashboardButton = include(
  'src/views/project/projectNavigator/dashboardButton/DashboardButton.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const Navigator = (_, children) => {
  element = compose('div', { style: 'height: 40px;' }, children);
  return element;
};

const ProjectNavigator = (getProps) => {
  const element = Navigator({}, [
    DataSourcesButton(getProps),
    DashboardEditorButton(getProps),
    DashboardButton(getProps),
  ]);

  return element;
};

module.exports = ProjectNavigator;
