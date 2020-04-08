const styled = include('src/libraries/styled/styled.js');
const { span$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const ApiInputLabel$ = styled({
  // TODO: Make this one align nicely next to the input
  color: 'dimgray',
  height: '64px',
  padding: '0 16px',
  lineHeight: '64px',
  fontSize: '16px',
  width: '192px',
  border: 'none',
  outline: 'none',
  display: 'inline-block',
  boxSizing: 'border-box',
})(span$);

module.exports = ApiInputLabel$;
