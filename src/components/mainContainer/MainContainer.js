const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const MainContainer$ = styled(div$, {
  height: 'calc(100% - 64px)',
  background: 'GhostWhite',
  position: 'absolute',
  left: '0',
  right: '0',
});

module.exports = MainContainer$;
