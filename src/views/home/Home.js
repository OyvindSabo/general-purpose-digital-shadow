const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const Home$ = () => div$('HomeView');

module.exports = Home$;
