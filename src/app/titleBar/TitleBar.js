const ExportedTitleBar = include(
  'src/app/titleBar/exportedTitleBar/ExportedTitleBar.js'
);
const UnexportedTitleBar = include(
  'src/app/titleBar/unexportedTitleBar/UnexportedTitleBar.js'
);

const TitleBar = (getProps) => {
  const element = getProps().state.isExported
    ? ExportedTitleBar(getProps)
    : UnexportedTitleBar(getProps);

  return Object.assign(element, { key: 'title-bar' });
};

module.exports = TitleBar;
