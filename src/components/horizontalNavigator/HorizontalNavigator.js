const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const HorizontalNavigator$ = styled({ height: '64px' })(div$);

module.exports = HorizontalNavigator$;
