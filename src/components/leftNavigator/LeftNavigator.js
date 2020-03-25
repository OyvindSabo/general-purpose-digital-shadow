const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const LeftNavigator$ = (...children) =>
  div$(...children).setStyle({
    height: '100%',
    width: '80px',
    borderRadius: '10px 0 0 0',
    borderRight: '1px solid LightGray',
    overflow: 'hidden',
    background: 'White',
    position: 'absolute',
  });

module.exports = LeftNavigator$;
