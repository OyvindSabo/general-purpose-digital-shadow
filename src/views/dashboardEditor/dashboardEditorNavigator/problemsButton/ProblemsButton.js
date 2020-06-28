const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const determineIsSelected = (currentRoute) => {
  return (
    currentRoute === '/projects/<projectId:string>/dashboard-editor/problems'
  );
};

const getHref = (selectedProjectId) => {
  return `#!/projects/${selectedProjectId}/dashboard-editor/problems`;
};

const ProblemsButton = (getProps) => {
  const getCurrentRoute = () => getProps().state.currentRoute;
  const getSelectedProjectId = () => getProps().state.selectedProjectId;

  const element = NavigationButton(() => ({
    label: `Problems (${getProps().state.widgetsCodeErrors.length})`,
    isSelected: determineIsSelected(getCurrentRoute()),
    href: getHref(getSelectedProjectId()),
  }));

  return element;
};

module.exports = ProblemsButton;
