const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const determineIsSelected = (currentRoute) => {
  return [
    '/projects/<projectId:string>',
    '/projects/<projectId:string>/data-sources',
  ].includes(currentRoute);
};

const getHref = (selectedProjectId) => {
  return `#!/projects/${selectedProjectId}/data-sources`;
};

const DataSourcesButton = (getProps) => {
  const getCurrentRoute = () => getProps().state.currentRoute;
  const getSelectedProjectId = () => getProps().state.selectedProjectId;

  const element = NavigationButton(() => ({
    label: 'Data sources',
    isSelected: determineIsSelected(getCurrentRoute()),
    href: getHref(getSelectedProjectId()),
  }));

  return element;
};

module.exports = DataSourcesButton;
