const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const HorizontalNavigator = (_, children) => {
  const element = compose(
    'div',
    {
      style: `height: 64px;
              box-shadow: rgba(0, 0, 0, 0.25) 0 0 10px -5px;
              background: white;
              color: darkslategray;`,
    },
    children
  );
  return Object.assign(element, { key: 'horizontal-navigator' });
};

module.exports = HorizontalNavigator;
