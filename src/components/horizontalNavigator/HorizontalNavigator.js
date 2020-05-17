const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const HorizontalNavigator = (_, children) => {
  console.log('HorizontalNavigator');
  const element = compose(
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
  return element;
};

module.exports = HorizontalNavigator;
