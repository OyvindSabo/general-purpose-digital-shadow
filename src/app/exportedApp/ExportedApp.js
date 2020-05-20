const TitleBar = include('src/app/titleBar/TitleBar.js');
const Dashboard = include('src/views/dashboard/Dashboard.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ExportedApp = (getProps) => {
  const element = compose('div', {}, [
    TitleBar(getProps),
    compose('div', {}, [Dashboard(getProps)]),
  ]);
  return element;
};

module.exports = ExportedApp;
