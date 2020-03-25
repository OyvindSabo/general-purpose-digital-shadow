const WidgetValue$ = ({ value$ }) =>
  div$(toFixed$(value$, 2)).setStyle({
    fontSize: '60px',
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
  });

module.exports = WidgetValue$;
