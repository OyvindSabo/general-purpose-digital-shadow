const WidgetLabel = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue = include('src/components/widgetValue/WidgetValue.js');
const { defineComponent, span } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const ValueWidget = defineComponent(({ label, value }) => {
  return span(
    {
      style: {
        display: 'inline-block',
        position: 'relative',
        color: 'dimgray',
        // 24 x SizeUnit
        width: '480px',
        // 16 x SizeUnit
        height: '320px',
      },
    },
    WidgetLabel({ label }),
    WidgetValue({ value })
  );
});

module.exports = ValueWidget;
