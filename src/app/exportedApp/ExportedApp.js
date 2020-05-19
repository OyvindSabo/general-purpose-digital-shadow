const ProjectContainer = include(
  'src/views/project/projectContainer/ProjectContainer.js'
);
const TitleBar = include('src/app/titleBar/TitleBar.js');
const Dashboard = include('src/views/dashboard/Dashboard.js');

const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => { state, viewModel }
const ExportedApp = (getProps) => {
  const element = compose('div', {}, [
    TitleBar(getProps),
    ProjectContainer({}, [Dashboard(getProps)]),
  ]);

  return Object.assign(element, { key: 'exported-app' });
};

module.exports = ExportedApp;
