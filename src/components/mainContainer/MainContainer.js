const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const Styled = include('src/libraries/styled/Styled.js');

const MainContainer$ = Styled(div$, {
  height: 'calc(100% - 40px)',
  borderRadius: '10px 10px 0 0',
  background: 'GhostWhite',
  position: 'absolute',
  left: '0',
  right: '0',
});

module.exports = MainContainer$;
