const { div$, a$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const ViewTitle$ = styled({
  fontSize: '32px',
  padding: '16px',
  display: 'inline-block',
})(div$);

const ExportButton$ = styled({
  fontSize: '16px',
  padding: '0 16px',
  float: 'right',
  lineHeight: '64px',
})(div$);

module.exports = { ViewTitle$, ExportButton$ };
