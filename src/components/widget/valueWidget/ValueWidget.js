const WidgetLabel = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue = include('src/components/widgetValue/WidgetValue.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ValueWidget = (getProps) => {
  const element = compose(
    'span',
    () => ({
      // width = 24 x 20px
      // height = 16 x 20px
      style: `display: inline-block;
              position: relative;
              color: dimgray;
              width: 480px;
              height: 320px;
              background: ${Number(getProps().value) === 500 ? 'blue' : 'red'}`,
    }),
    [
      WidgetLabel(() => ({ label: getProps().label })),
      WidgetValue(() => ({ value: getProps().value })),
    ]
  );
  return Object.assign(element, { key: 'value-widget' });
};

module.exports = ValueWidget;
