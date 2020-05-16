const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ViewTitle = (_, children) => {
  return compose(
    'div',
    () => ({
      style: { fontSize: '32px', padding: '16px', display: 'inline-block' },
    }),
    children
  );
};

const ExportButton = (getProps, children) => {
  return compose(
    'div',
    () => ({
      onclick: getProps().onclick,
      style: {
        fontSize: '16px',
        padding: '0 16px',
        float: 'right',
        lineHeight: '64px',
        cursor: 'pointer',
      },
    }),
    children
  );
};

module.exports = { ViewTitle, ExportButton };
