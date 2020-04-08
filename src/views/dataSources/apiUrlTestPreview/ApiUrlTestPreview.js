const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const ApiUrlTestPreview$ = styled({
  color: 'dimgray',
  background: 'white',
  lineHeight: '64px',
  fontSize: '0 16px',
  width: '100%',
  padding: '16px',
  display: 'inline-block',
  boxSizing: 'border-box',
})(div$);

module.exports = ApiUrlTestPreview$;
