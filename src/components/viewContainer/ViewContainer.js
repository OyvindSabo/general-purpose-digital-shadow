const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const ViewContainer$ = styled(div$, {
  position: 'absolute',
  top: '0',
  left: '80px',
  right: '0',
});

module.exports = ViewContainer$;
