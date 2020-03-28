const styled = include('src/libraries/styled/styled.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const VerticalNavigator$ = withShadow(
  styled({
    height: '100%',
    width: '64px',
    position: 'absolute',
  })(div$)
);

module.exports = VerticalNavigator$;
