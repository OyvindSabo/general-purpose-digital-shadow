const Observable = include('src/libraries/observable/Observable.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { choose$ } = include('src/libraries/observable/utils.js');

const ExpandCodeEditorButton$ = ({ icon, label$, isOpen$ }) => {
  const isHovered$ = new Observable(false);
  return div$(
    div$(choose$(isOpen$, '−', '+')).setStyle({
      fontSize: '30px',
      textAlign: 'center',
      marginTop: '15px',
      pointerEvents: 'none',
      userSelect: 'none',
      transform: choose$(isOpen$, 'rotate(180deg)', 'rotate(0deg)'),
      transition: '0.5s',
    })
  )
    .setStyle({
      position: 'absolute',
      background: choose$(isHovered$, 'dodgerblue', 'royalblue'),
      borderRadius: '50%',
      color: 'white',
      height: '60px',
      width: '60px',
      margin: '10px',
      overflow: 'hidden',
      transition: '0.5s',
      cursor: 'pointer',
      zIndex: '1',
    })
    .onMouseEnter(element => {
      isHovered$.value = true;
    })
    .onMouseLeave(element => {
      isHovered$.value = false;
    });
};

module.exports = ExpandCodeEditorButton$;
