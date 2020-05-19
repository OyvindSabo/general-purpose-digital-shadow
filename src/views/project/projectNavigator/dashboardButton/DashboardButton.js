const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const determineIsSelected = (currentRoute) => {
  return currentRoute === '/projects/<projectId:string>/dashboard';
};

const getHref = (selectedProjectId) => {
  return `#!/projects/${selectedProjectId}/dashboard`;
};

const DashboardButton = (getProps) => {
  const getCurrentRoute = () => getProps().state.currentRoute;
  const getSelectedProjectId = () => getProps().state.selectedProjectId;

  const element = NavigationButton(() => ({
    label: 'Dashboard',
    isSelected: determineIsSelected(getCurrentRoute()),
    href: getHref(getSelectedProjectId()),
  }));

  return element;
};

module.exports = DashboardButton;
