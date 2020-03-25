const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const MediumWidgetBackgroundContainer$ = (...children) => {
  return div$(...children).setStyle({
    padding: '20px',
    width: '480px',
    height: '320px',
    display: 'inline-block',
    boxSizing: 'border-box',
    verticalAlign: 'top',
  });
};

module.exports = MediumWidgetBackgroundContainer$;
