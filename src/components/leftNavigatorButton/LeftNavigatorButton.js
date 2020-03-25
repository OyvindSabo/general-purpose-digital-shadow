const { choose$ } = include('src/libraries/observable/utils.js');

const { Button$, Icon$, Label$ } = include(
  'src/components/leftNavigatorButton/atoms.js'
);
const LeftNavigatorButton$ = ({ icon, label, route, isActive$ }) => {
  return Button$(Icon$(icon), Label$(label))
    .setStyle({
      background: choose$(isActive$, 'whitesmoke', 'initial'),
      color: choose$(isActive$, 'dimgray', 'gray'),
    })
    .onMouseEnter(element => {
      element.setStyle({
        background: 'whitesmoke',
        color: 'dimgray',
      });
    })
    .onMouseLeave(element => {
      element.setStyle({
        background: choose$(isActive$, 'whitesmoke', 'initial'),
        color: choose$(isActive$, 'dimgray', 'gray'),
      });
    })
    .onClick(() => (location.hash = `#!${route}`));
};

module.exports = LeftNavigatorButton$;
