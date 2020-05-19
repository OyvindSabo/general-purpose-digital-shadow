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
  return Object.assign(element, { key: 'view-title' });
};

const ExportButton = (getProps) => {
  const element = compose(
    'div',
    () => {
      const { innerText, onclick } = getProps();
      return {
        innerText,
        onclick,
        style: `font-size: 16px;
              padding: 0 16px;
              float: right;
              line-height: 64px;
              cursor: pointer;`,
      };
    },
    []
  );

  return Object.assign(element, { key: 'export-button' });
};

module.exports = { ViewTitle, ExportButton };
