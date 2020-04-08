const { button$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const Observable = include('src/libraries/observable/Observable.js');
const { choose$ } = include('src/libraries/observable/utils.js');

const TextButton$ = (value$) => {
  const isHovered$ = new Observable(false);
  return button$(value$)
    .setStyle({
      color: choose$(isHovered$, 'darkslategray', 'slategray'),
      height: '64px',
      background: 'white',
      lineHeight: '64px',
      fontSize: '16px',
      width: '100%',
      textAlign: 'center',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      padding: '0 16px',
    })
    .onMouseEnter(() => (isHovered$.value = true))
    .onMouseLeave(() => (isHovered$.value = false));
};

module.exports = TextButton$;
