const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const WidgetValue = (getProps) => {
  const element = compose(
    'div',
    () => ({
      innerText: Number(getProps().value).toFixed(2),
      style: `font-size: 60px;
              text-align: center;
              width: 100%;
              position: absolute;
              top: 50%;
              transform: translate(0, -50%);`,
    }),
    []
  );
  return element;
};

module.exports = WidgetValue;
