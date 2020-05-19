const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const WidgetLabel = (getProps) => {
  const element = compose(
    'div',
    {
      innerText: getProps().label,
      style: `font-size: 20px;
              margin-top: 20px;
              text-align: center;
              position: absolute;
              width: 100%;
              pointer-events: none;
              user-select: none;`,
    },
    []
  );
  return Object.assign(element, { key: 'widget-label' });
};

module.exports = WidgetLabel;
