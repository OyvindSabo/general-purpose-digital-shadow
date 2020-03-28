const { choose$ } = include('src/libraries/observable/utils.js');

const { Button$, Icon$, Label$ } = include(
  'src/components/leftNavigatorButton/atoms.js'
);
const LeftNavigatorButton$ = ({
  icon,
  label,
  route,
  isActive$,
  labelColor$,
  highlightLabelColor$,
  backgroundColor$,
  highlightBackgroundColor$,
}) => {
  return Button$(Icon$(icon), Label$(label))
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
    .onClick(() => (location.hash = `#!${route}`));
};

module.exports = LeftNavigatorButton$;
