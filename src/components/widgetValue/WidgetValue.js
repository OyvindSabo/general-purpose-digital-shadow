const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const isNumber = (value) => !isNaN(Number(value));

const isNullish = (value) => value === null || value === undefined;

const WidgetValue = (getProps) => {
  const element = compose(
    'div',
    () => ({
      innerText: isNumber(getProps().value)
        ? Number(getProps().value).toFixed(2)
        : isNullish(getProps().value)
        ? ''
        : getProps().value,
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
