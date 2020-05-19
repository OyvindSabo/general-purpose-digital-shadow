const DashboardWidgets = include(
  'src/components/dashboardWidgets/DashboardWidgets.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const Dashboard = (getProps) => {
  const element = compose('div', { style: `padding: 10px;` }, [
    DashboardWidgets(getProps),
  ]);

  return element;
};

module.exports = Dashboard;
