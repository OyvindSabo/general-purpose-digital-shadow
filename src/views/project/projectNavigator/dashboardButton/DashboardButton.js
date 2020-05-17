const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const DashboardButton = (getProps) => {
  const determineIsSelected = (currentRoute) =>
    currentRoute === '/projects/<projectId:string>/dashboard';

  const getHref = (selectedProjectId) =>
    `#!/projects/${selectedProjectId}/dashboard`;

  const element = NavigationButton(() => {
    const { currentRoute, selectedProjectId } = getProps().state;
    return {
      label: 'Dashboard',
      isSelected: determineIsSelected(currentRoute),
      href: getHref(selectedProjectId),
    };
  });

  return element;
};

module.exports = DashboardButton;
