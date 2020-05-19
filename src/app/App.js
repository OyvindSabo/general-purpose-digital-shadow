const ExportedApp = include('src/app/exportedApp/ExportedApp.js');
const UnexportedApp = include('src/app/unexportedApp/UnexportedApp.js');

// getProps::() => { state, viewModel }
const App = (getProps) => {
  const element = getProps().state.isExported
    ? ExportedApp(getProps)
    : UnexportedApp(getProps);
  return element;
};

module.exports = App;
