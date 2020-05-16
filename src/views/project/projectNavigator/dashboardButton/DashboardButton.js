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

  const updateNavigationButton = element.update;

  element.update = () => {
    updateNavigationButton();
  };

  return element;
};

module.exports = DashboardButton;
