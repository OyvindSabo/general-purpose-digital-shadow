const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const WidgetLabel = (getProps) => {
  const element = compose(
    'div',
    () => ({
      style: {
        fontSize: '20px',
        marginTop: '20px',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
      },
    }),
    () => [getProps().label]
  );
  return element;
};

module.exports = WidgetLabel;
