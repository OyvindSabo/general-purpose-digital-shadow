const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const DataSourcesView$ = () => div$('DataSourcesView');

module.exports = DataSourcesView$;
