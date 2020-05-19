const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const determineIsSelected = (currentRoute) => {
  return currentRoute === '/projects/<projectId:string>/dashboard/edit';
};

const getHref = (selectedProjectId) => {
  return `#!/projects/${selectedProjectId}/dashboard/edit`;
};

const DashboardEditorButton = (getProps) => {
  const getCurrentRoute = () => getProps().state.currentRoute;
  const getSelectedProjectId = () => getProps().state.selectedProjectId;

  const element = NavigationButton(() => ({
    label: 'Dashboard editor',
    isSelected: determineIsSelected(getCurrentRoute()),
    href: getHref(getSelectedProjectId()),
  }));

  return element;
};

module.exports = DashboardEditorButton;
