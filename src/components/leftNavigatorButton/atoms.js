const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const Button$ = styled(div$, {
  height: '80px',
  width: '80px',
  overflow: 'hidden',
  transition: '0.5s',
  cursor: 'pointer',
});
const Icon$ = styled(div$, {
  fontSize: '30px',
  textAlign: 'center',
  marginTop: '15px',
  pointerEvents: 'none',
  userSelect: 'none',
});
const Label$ = styled(div$, {
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
