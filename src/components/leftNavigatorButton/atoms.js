const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const Styled = include('src/libraries/styled/Styled.js');

const Button$ = Styled(div$, {
  height: '80px',
  width: '80px',
  overflow: 'hidden',
  transition: '0.5s',
  cursor: 'pointer',
});
const Icon$ = Styled(div$, {
  fontSize: '30px',
  textAlign: 'center',
  marginTop: '15px',
  pointerEvents: 'none',
  userSelect: 'none',
});
const Label$ = Styled(div$, {
  fontSize: '15px',
  textAlign: 'center',
  pointerEvents: 'none',
  userSelect: 'none',
});

module.exports = {
  Button$,
  Icon$,
  Label$,
};
