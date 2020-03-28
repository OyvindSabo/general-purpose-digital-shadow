const styled = include('src/libraries/styled/styled.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const HorizontalNavigator$ = withShadow(styled({ height: '64px' })(div$));

module.exports = HorizontalNavigator$;
