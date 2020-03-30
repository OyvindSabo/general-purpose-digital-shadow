const styled = include('src/libraries/styled/styled.js');
const { textArea$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const CodeEditor$ = styled({
  width: '100%',
  height: 'calc(100vh - 192px)',
  padding: '20px',
  background: 'black',
  color: 'white',
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: '14px',
  lineHeight: '20px',
  whiteSpace: 'nowrap',
})(textArea$);

module.exports = CodeEditor$;
