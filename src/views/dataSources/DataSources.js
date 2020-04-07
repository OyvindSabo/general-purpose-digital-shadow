const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ApiIntervalInput$ = include(
  'src/views/dataSources/apiIntervalInput/ApiIntervalInput.js'
);
const ApiUrlInput$ = include(
  'src/views/dataSources/apiUrlInput/ApiUrlInput.js'
);

const DataSourcesView$ = ({ viewModel }) =>
  div$(ApiUrlInput$({ viewModel }), ApiIntervalInput$({ viewModel }));

module.exports = DataSourcesView$;
