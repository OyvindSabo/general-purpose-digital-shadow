const { defineComponent, div } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const WidgetValue = defineComponent(({ value }) => {
  return div(
    {
      style: {
        fontSize: '60px',
        textAlign: 'center',
        width: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
      },
    },
    Number(value).toFixed(2)
  );
});

module.exports = WidgetValue;
