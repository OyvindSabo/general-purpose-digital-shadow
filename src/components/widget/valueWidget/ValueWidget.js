const WidgetLabel = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue = include('src/components/widgetValue/WidgetValue.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ValueWidget = (getProps) => {
  const element = compose(
    'span',
    () => ({
      style: {
        display: 'inline-block',
        position: 'relative',
        color: 'dimgray',
        width: '480px', // 24 x SizeUnit
        height: '320px', // 16 x SizeUnit
        background: Number(getProps().value) === 500 ? 'blue' : 'red',
      },
    }),
    [
      WidgetLabel(() => ({ label: getProps().label })),
      WidgetValue(() => ({ value: getProps().value })),
    ]
  );
  return element;
};

module.exports = ValueWidget;
