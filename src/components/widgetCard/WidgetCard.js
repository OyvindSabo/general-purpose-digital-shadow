const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { add$ } = include('src/libraries/observable/utils.js');

const WidgetCard$ = ({ width$, height$ }) =>
  styled({
    margin: '32px 0 0 32px',
    width: add$(width$, 'px'),
    height: add$(height$, 'px'),
    display: 'inline-block',
    verticalAlign: 'top',
    background: 'white',
  })(div$);

module.exports = WidgetCard$;
