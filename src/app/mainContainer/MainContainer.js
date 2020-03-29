const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');

const MainContainer$ = styled({
  height: 'calc(100% - 64px)',
  position: 'absolute',
  left: '0',
  right: '0',
})(div$);

module.exports = MainContainer$;
