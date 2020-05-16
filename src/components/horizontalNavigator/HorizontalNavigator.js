const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const HorizontalNavigator = ({}, children) => {
  return compose(
    'div',
    () => ({
      style: {
        height: '64px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0 0 10px -5px',
        background: 'white',
        color: 'darkslategray',
      },
    }),
    children
  );
};

module.exports = HorizontalNavigator;
