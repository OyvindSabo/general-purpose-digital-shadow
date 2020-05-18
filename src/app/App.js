const ExportedApp = include('src/app/exportedApp/ExportedApp.js');
const UnexportedApp = include('src/app/unexportedApp/UnexportedApp.js');

// getProps::() => { state, viewModel }
const App = (getProps) => {
  return getProps().state.isExported
    ? ExportedApp(getProps)
    : UnexportedApp(getProps);
};

module.exports = App;
