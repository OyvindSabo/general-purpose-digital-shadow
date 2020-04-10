const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const ApiUrlTestPreview$ = styled({
  color: 'lightslategray',
  background: 'ghostwhite',
  lineHeight: '32px',
  fontSize: '0 16px',
  width: '100%',
  margin: '8px',
  padding: '8px',
  display: 'inline-block',
  boxSizing: 'border-box',
  fontFamily: '"Courier New", Courier, monospace',
  whiteSpace: 'pre-wrap',
  maxHeight: '448px',
  minHeight: '48px',
  overflow: 'auto',
})(div$);

module.exports = ApiUrlTestPreview$;
