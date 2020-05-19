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

const ProjectNavigator = (getProps) => {
  const element = compose('div', { style: 'height: 40px;' }, [
    DataSourcesButton(getProps),
    DashboardEditorButton(getProps),
    DashboardButton(getProps),
  ]);

  return Object.assign(element, 'project-navigator');
};

module.exports = ProjectNavigator;
