const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const HorizontalNavigator = ({}, children) => {
  return compose('div', () => ({ style: { height: '40px' } }), children);
};

module.exports = HorizontalNavigator;
