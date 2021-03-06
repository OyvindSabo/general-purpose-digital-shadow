const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const determineIsSelected = (currentRoute) => {
  return (
    currentRoute === '/projects/<projectId:string>/dashboard-editor' ||
    currentRoute ===
      '/projects/<projectId:string>/dashboard-editor/widgets-preview' ||
    currentRoute ===
      '/projects/<projectId:string>/dashboard-editor/raw-output' ||
    currentRoute === '/projects/<projectId:string>/dashboard-editor/problems'
  );
};

const getHref = (selectedProjectId) => {
  return `#!/projects/${selectedProjectId}/dashboard-editor`;
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
