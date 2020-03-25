const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const MediumWidgetBackgroundContainer$ = styled(div$, {
  padding: '20px',
  width: '480px',
  height: '320px',
  display: 'inline-block',
  boxSizing: 'border-box',
  verticalAlign: 'top',
});

module.exports = MediumWidgetBackgroundContainer$;
