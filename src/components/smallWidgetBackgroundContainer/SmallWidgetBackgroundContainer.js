const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const SmallWidgetBackgroundContainer$ = styled(div$, {
  padding: '20px',
  width: '360px',
  height: '240px',
  display: 'inline-block',
  boxSizing: 'border-box',
  verticalAlign: 'top',
});

module.exports = SmallWidgetBackgroundContainer$;
