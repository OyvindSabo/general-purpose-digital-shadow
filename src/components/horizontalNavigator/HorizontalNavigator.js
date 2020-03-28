const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const HorizontalNavigator$ = styled(div$, {
  height: '64px',
});

module.exports = HorizontalNavigator$;
