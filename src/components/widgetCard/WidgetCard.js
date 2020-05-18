const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const WidgetCard = (getProps, children) =>
  compose(
    'div',
    () => {
      const { height, width } = getProps();
      return {
        style: `margin: 32px 0 0 32px;
                width: ${width}px;
                height: ${height}px;
                display: inline-block;
                vertical-align: top;
                background: white;`,
      };
    },
    children
  );

module.exports = WidgetCard;
