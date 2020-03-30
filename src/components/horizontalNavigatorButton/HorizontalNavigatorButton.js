const { add$, choose$ } = include('src/libraries/observable/utils.js');

const { Button$, Label$ } = include(
  'src/components/horizontalNavigatorButton/atoms.js'
);
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const HorizontalNavigatorButton$ = ({
  label,
  route$,
  isActive$,
  labelColor$,
  highlightLabelColor$,
}) => {
  return div$(label)
    .setStyle({
      height: '64px',
      width: '192px',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: '64px',
      boxSizing: 'border-box',
      borderBottom: choose$(isActive$, '2px solid deepskyblue', 'none'),
      color: choose$(isActive$, highlightLabelColor$, labelColor$),
      userSelect: 'none',
    })
    .onMouseEnter(element => {
      element.setStyle({
        color: highlightLabelColor$,
      });
    })
    .onMouseLeave(element => {
      element.setStyle({
        borderBottom: choose$(isActive$, '2px solid deepskyblue', 'none'),
        color: choose$(isActive$, highlightLabelColor$, labelColor$),
      });
    })
    .onClick(() => (location.hash = add$('#!', route$).value));

  /*return Button$(Label$(label))
    .setStyle({
      background: choose$(
        isActive$,
        highlightBackgroundColor$,
        backgroundColor$
      ),
      color: choose$(isActive$, highlightLabelColor$, labelColor$),
    })
    .onMouseEnter(element => {
      element.setStyle({
        background: highlightBackgroundColor$,
        color: highlightLabelColor$,
      });
    })
    .onMouseLeave(element => {
      element.setStyle({
        background: choose$(
          isActive$,
          highlightBackgroundColor$,
          backgroundColor$
        ),
        color: choose$(isActive$, highlightLabelColor$, labelColor$),
      });
    })
    .onClick(() => (location.hash = add$('#!', route$).value));*/
};

module.exports = HorizontalNavigatorButton$;
