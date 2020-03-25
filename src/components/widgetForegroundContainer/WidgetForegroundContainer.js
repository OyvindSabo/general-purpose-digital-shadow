const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const WidgetForegroundContainer$ = (...children) => {
  return div$(...children).setStyle({
    height: '100%',
    border: '1px solid LightGray',
    boxSizing: 'border-box',
    background: 'White',
  });
};

module.exports = WidgetForegroundContainer$;
