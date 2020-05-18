const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const WidgetLabel = (getProps) => {
  const element = compose(
    'div',
    {
      style: `font-size: 20px;
              margin-top: 20px;
              text-align: center;
              position: absolute;
              width: 100%;
              pointer-events: none;
              user-select: none;`,
    },
    () => [getProps().label]
  );
  return element;
};

module.exports = WidgetLabel;
