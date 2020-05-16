const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');

// getProps::() => { state }
const DataSourcesButton = (getProps) => {
  const determineIsSelected = (currentRoute) =>
    [
      '/projects/<projectId:string>',
      '/projects/<projectId:string>/data-sources',
    ].includes(currentRoute);

  const getHref = (selectedProjectId) =>
    `#!/projects/${selectedProjectId}/data-sources`;

  const element = NavigationButton(() => {
    const { currentRoute, selectedProjectId } = getProps().state;
    return {
      label: 'Data sources',
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

module.exports = DataSourcesButton;
