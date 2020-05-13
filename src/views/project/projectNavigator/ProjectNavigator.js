const NavigationButton = include('src/libraries/simpleUI/NavigationButton.js');
const HorizontalNavigator = include(
  'src/libraries/simpleUI/HorizontalNavigator.js'
);
const { defineComponent } = include('src/libraries/simpleHTML/SimpleHTML.js');

const Navigator = defineComponent(({}, ...children) => {
  return HorizontalNavigator({ style: { height: '40px' } }, ...children);
});

const DataSourcesButton = defineComponent(({ state }) => {
  const { currentRoute, selectedProjectId } = state;
  const style = { width: '160px', height: '40px' };
  const isSelected = [
    '/projects/<projectId:string>',
    '/projects/<projectId:string>/data-sources',
  ].includes(currentRoute);
  const href = `#!/projects/${selectedProjectId}/data-sources`;
  return NavigationButton({ style, isSelected, href }, 'Data sources');
});

const DashboardEditorButton = defineComponent(({ state }) => {
  const { currentRoute, selectedProjectId } = state;
  const style = { width: '160px', height: '40px' };
  const isSelected =
    currentRoute === '/projects/<projectId:string>/dashboard/edit';
  const href = `#!/projects/${selectedProjectId}/dashboard/edit`;
  return NavigationButton({ style, isSelected, href }, 'Dashboard editor');
});

const DashboardButton = defineComponent(({ state }) => {
  const { currentRoute, selectedProjectId } = state;
  const style = { width: '160px', height: '40px' };
  const isSelected = currentRoute === '/projects/<projectId:string>/dashboard';
  const href = `#!/projects/${selectedProjectId}/dashboard`;
  return NavigationButton({ style, isSelected, href }, 'Dashboard');
});

const ProjectNavigator = defineComponent(({ state }) => {
  return Navigator(
    {},
    DataSourcesButton({ state }),
    DashboardEditorButton({ state }),
    DashboardButton({ state })
  );
});

module.exports = ProjectNavigator;
