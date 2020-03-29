const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { ViewTitle$ } = include('src/app/titleBar/atoms.js');
const { getViewTitle$ } = include('src/app/utils.js');

const TitleBar$ = ({ currentRoute$ }) =>
  HorizontalNavigator$(ViewTitle$(getViewTitle$(currentRoute$))).setStyle({
    background: 'white',
    color: 'darkslategray',
  });

module.exports = TitleBar$;
