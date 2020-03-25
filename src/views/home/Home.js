const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const HomeView$ = () => div$('HomeView');

module.exports = HomeView$;
