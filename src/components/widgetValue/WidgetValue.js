const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const WidgetValue = (getProps) => {
  const { value } = getProps();
  const element = compose(
    'div',
    () => ({
      style: {
        fontSize: '60px',
        textAlign: 'center',
        width: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
      },
    }),
    () => [Number(value).toFixed(2)]
  );
  return element;
};

module.exports = WidgetValue;
