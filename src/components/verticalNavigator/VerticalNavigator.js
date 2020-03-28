const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const VerticalNavigator$ = styled(div$, {
  height: '100%',
  width: '64px',
  position: 'absolute',
});

module.exports = VerticalNavigator$;
