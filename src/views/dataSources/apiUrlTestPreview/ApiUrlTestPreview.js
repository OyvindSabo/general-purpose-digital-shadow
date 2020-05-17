const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ApiUrlTestPreview = (_, children) => {
  const element = compose(
    'div',
    () => ({
      style: {
        color: 'lightslategray',
        background: 'ghostwhite',
        lineHeight: '32px',
        fontSize: '0 16px',
        width: '100%',
        margin: '8px',
        padding: '8px',
        display: 'inline-block',
        boxSizing: 'border-box',
        fontFamily: '"Courier New", Courier, monospace',
        whiteSpace: 'pre-wrap',
        maxHeight: '448px',
        minHeight: '48px',
        overflow: 'auto',
      },
    }),
    children
  );
  return element;
};

module.exports = ApiUrlTestPreview;
