const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const ViewContainer$ = styled({
  position: 'absolute',
  top: '0',
  left: '64px',
  right: '0',
})(div$);

module.exports = ViewContainer$;
