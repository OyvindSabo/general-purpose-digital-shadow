const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const HorizontalNavigator$ = styled(div$, {
  background: 'black',
  height: '64px',
});

module.exports = HorizontalNavigator$;
