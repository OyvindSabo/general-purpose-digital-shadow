const { defineComponent, div } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const HorizontalNavigator = defineComponent((props, ...children) => {
  return div(
    {
      ...props,
      style: {
        height: '64px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0 0 10px -5px',
        background: 'white',
        color: 'darkslategray',
      },
    },
    ...children
  );
});

module.exports = HorizontalNavigator;
