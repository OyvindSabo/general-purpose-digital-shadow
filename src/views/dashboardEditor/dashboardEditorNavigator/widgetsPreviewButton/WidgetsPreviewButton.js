const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

const determineIsSelected = (currentRoute) => {
  return [
    '/projects/<projectId:string>/dashboard-editor',
    '/projects/<projectId:string>/dashboard-editor/widgets-preview',
  ].includes(currentRoute);
};

const getHref = (selectedProjectId) => {
  return `#!/projects/${selectedProjectId}/dashboard-editor/widgets-preview`;
};

const WidgetsPreviewButton = (getProps) => {
  const getCurrentRoute = () => getProps().state.currentRoute;
  const getSelectedProjectId = () => getProps().state.selectedProjectId;

  const element = NavigationButton(() => ({
    label: 'Widgets preview',
    isSelected: determineIsSelected(getCurrentRoute()),
    href: getHref(getSelectedProjectId()),
  }));

  return element;
};

module.exports = WidgetsPreviewButton;
