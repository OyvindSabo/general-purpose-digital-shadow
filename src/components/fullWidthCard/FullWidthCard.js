const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const FullWidthCard = (_, children) => {
  return compose(
    'div',
    () => ({
      style: {
        color: 'dimgray',
        margin: '32px 32px 0 32px',
        background: 'white',
        lineHeight: '64px',
        fontSize: '16px',
      },
    }),
    children
  );
};

module.exports = FullWidthCard;
