const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ApiInputLabel = ({ label }) => {
  const element = compose(
    'span',
    () => ({
      // TODO: Make this one align nicely next to the input
      color: 'dimgray',
      height: '64px',
      padding: '0 16px',
      lineHeight: '64px',
      fontSize: '16px',
      width: '192px',
      border: 'none',
      outline: 'none',
      display: 'inline-block',
      boxSizing: 'border-box',
    }),
    [label]
  );
  return element;
};

module.exports = ApiInputLabel;
