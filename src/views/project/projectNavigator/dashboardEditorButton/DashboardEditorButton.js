const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const DashboardEditorButton = (getProps) => {
  const determineIsSelected = (currentRoute) =>
    currentRoute === '/projects/<projectId:string>/dashboard/edit';

  const getHref = (selectedProjectId) =>
    `#!/projects/${selectedProjectId}/dashboard/edit`;

  const element = NavigationButton(() => {
    const { currentRoute, selectedProjectId } = getProps().state;
    return {
      label: 'Dashboard editor',
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

module.exports = DashboardEditorButton;
