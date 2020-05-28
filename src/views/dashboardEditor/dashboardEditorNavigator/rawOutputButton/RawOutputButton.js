const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const determineIsSelected = (currentRoute) => {
  return (
    currentRoute === '/projects/<projectId:string>/dashboard-editor/raw-output'
  );
};

const getHref = (selectedProjectId) => {
  return `#!/projects/${selectedProjectId}/dashboard-editor/raw-output`;
};

const RawOutputButton = (getProps) => {
  const getCurrentRoute = () => getProps().state.currentRoute;
  const getSelectedProjectId = () => getProps().state.selectedProjectId;

  const element = NavigationButton(() => ({
    label: 'Raw output',
    isSelected: determineIsSelected(getCurrentRoute()),
    href: getHref(getSelectedProjectId()),
  }));

  return element;
};

module.exports = RawOutputButton;
