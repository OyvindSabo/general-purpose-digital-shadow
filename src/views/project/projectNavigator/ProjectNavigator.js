const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');
const HorizontalNavigator = include(
  'src/libraries/simpleUI/HorizontalNavigator.js'
);

const button = (title) =>
  Object.assign(NavigationButton(), {
    widthUnits: 8,
    heightUnits: 2,
    title,
  });

const Navigator = (children) =>
  Object.assign(HorizontalNavigator(), {
    heightUnits: 2,
    children,
  });

const ProjectNavigator$ = ({ currentRoute$, viewModel }) => {
  const dataSourcesButton = button('Data sources');
  const dashboardEditorButton = button('Dashboard editor');
  const dashboardButton = button('Dashboard');
  const navigator = Navigator([
    dataSourcesButton,
    dashboardEditorButton,
    dashboardButton,
  ]);

  const doUpdateIsSelected = (currentRoute) => {
    dataSourcesButton.isSelected = [
      '/projects/<projectId:string>',
      '/projects/<projectId:string>/data-sources',
    ].includes(currentRoute);
    dashboardEditorButton.isSelected =
      currentRoute === '/projects/<projectId:string>/dashboard/edit';
    dashboardButton.isSelected =
      currentRoute === '/projects/<projectId:string>/dashboard';
  };

  const doUpdateHref = (selectedProjectId) => {
    dataSourcesButton.href = `#!/projects/${selectedProjectId}/data-sources`;
    dashboardEditorButton.href = `#!/projects/${selectedProjectId}/dashboard/edit`;
    dashboardButton.href = `#!/projects/${selectedProjectId}/dashboard`;
  };

  addEventListener(currentRoute$.id, () => {
    doUpdateIsSelected(currentRoute$.value);
  });

  addEventListener(viewModel.selectedProjectId$.id, () => {
    doUpdateHref(viewModel.selectedProjectId$.value);
  });

  // When this component becomes purely imperative, these will no longer be needed
  doUpdateIsSelected(currentRoute$.value);
  doUpdateHref(viewModel.selectedProjectId$.value);

  return navigator;
};

module.exports = ProjectNavigator$;
