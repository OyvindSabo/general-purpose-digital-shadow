const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const WidgetLabel$ = ({ label$ }) =>
  div$(label$).setStyle({
    fontSize: '20px',
    marginTop: '20px',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    pointerEvents: 'none',
    userSelect: 'none',
  });

module.exports = WidgetLabel$;
