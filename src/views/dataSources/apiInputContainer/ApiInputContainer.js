const styled = include('src/libraries/styled/styled.js');
const { span$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const ApiInputContainer$ = styled({
  // TODO: Make this one align nicely next to the input
  color: 'dimgray',
  height: '64px',
  padding: '8px',
  lineHeight: '64px',
  fontSize: '16px',
  width: 'calc(100% - 192px)',
  display: 'inline-block',
  boxSizing: 'border-box',
})(span$);

module.exports = ApiInputContainer$;
