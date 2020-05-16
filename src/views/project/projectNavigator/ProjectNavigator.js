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

const Navigator = ({}, children) => {
  element = compose('div', () => ({ style: { height: '40px' } }), children);
  element.update = ({}) => {};
  return element;
};

const ProjectNavigator = (getProps) => {
  const element = Navigator({}, [
    DataSourcesButton(getProps),
    DashboardEditorButton(getProps),
    DashboardButton(getProps),
  ]);
  console.log('projectNavigator: ', element);
  return element;
};

module.exports = ProjectNavigator;
