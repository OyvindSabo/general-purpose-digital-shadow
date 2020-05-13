const { defineComponent, div } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const WidgetLabel = defineComponent(({ label }) => {
  return div(
    {
      style: {
        fontSize: '20px',
        marginTop: '20px',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
      },
    },
    label
  );
});

module.exports = WidgetLabel;
