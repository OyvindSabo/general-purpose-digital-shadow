const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const TopNavigator$ = () => div$().setStyle({ height: '40px' });

module.exports = TopNavigator$;
