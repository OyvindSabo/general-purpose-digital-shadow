const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const LeftNavigator$ = styled(div$, {
  height: '100%',
  width: '80px',
  borderRadius: '10px 0 0 0',
  borderRight: '1px solid LightGray',
  overflow: 'hidden',
  background: 'White',
  position: 'absolute',
});

module.exports = LeftNavigator$;
