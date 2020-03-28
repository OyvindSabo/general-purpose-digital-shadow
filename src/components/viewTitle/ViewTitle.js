const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const ViewTitle$ = styled(div$, {
  fontSize: '32px',
  padding: '16px',
});

module.exports = ViewTitle$;
