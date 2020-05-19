const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ViewTitle = (_, children) => {
  const element = compose(
    'div',
    {
      style: `font-size: 32px;
              padding: '16px';
              display: inline-block;`,
    },
    children
  );
  return element;
};

const ExportButton = (getProps) => {
  const element = compose(
    'div',
    () => ({
      innerText: getProps().innerText,
      onclick: getProps().onclick,
      style: `font-size: 16px;
              padding: 0 16px;
              float: right;
              line-height: 64px;
              cursor: pointer;`,
    }),
    []
  );

  return element;
};

module.exports = { ViewTitle, ExportButton };
