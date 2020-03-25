const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const TopNavigator$ = styled(div$, { height: '40px' });

module.exports = TopNavigator$;
