const styled = include('src/libraries/styled/styled.js');
const { input$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const Input$ = styled({
  color: 'dimgray',
  background: 'ghostwhite',
  height: '100%',
  padding: '0 8px',
  lineHeight: '64px',
  fontSize: '16px',
  width: '100%',
  border: 'none',
  outline: 'none',
})(input$);

module.exports = Input$;
