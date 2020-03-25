const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const Styled = include('src/libraries/styled/Styled.js');

const ViewContainer$ = Styled(div$, {
  position: 'absolute',
  top: '0',
  left: '80px',
  right: '0',
});

module.exports = ViewContainer$;
