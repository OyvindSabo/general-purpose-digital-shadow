const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const Button$ = styled({
  height: '64px',
  width: '64px',
  overflow: 'hidden',
  transition: '0.5s',
  cursor: 'pointer',
})(div$);
const Icon$ = styled({
  ///TODO: continue
  fontSize: '30px',
  textAlign: 'center',
  marginTop: '15px',
  pointerEvents: 'none',
  userSelect: 'none',
})(div$);
const Label$ = styled({
  fontSize: '15px',
  textAlign: 'center',
  pointerEvents: 'none',
  userSelect: 'none',
})(div$);

module.exports = {
  Button$,
  Icon$,
  Label$,
};
