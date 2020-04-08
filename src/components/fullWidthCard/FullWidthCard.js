const styled = include('src/libraries/styled/styled.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const FullWidthCard$ = withShadow(
  styled({
    color: 'dimgray',
    margin: '32px 32px 0 32px',
    background: 'white',
    lineHeight: '64px',
    fontSize: '16px',
  })(div$)
);

module.exports = FullWidthCard$;
