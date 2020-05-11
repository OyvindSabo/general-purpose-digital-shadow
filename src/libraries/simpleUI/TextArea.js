const { doAddInnerShadow } = include('src/libraries/simpleHTML/SimpleHTML.js');
const { Sizes } = include('src/libraries/simpleUI/Constants.js');

const TextArea = () => {
  const textArea = document.createElement('textarea');

  Object.assign(textArea.style, {
    borderRadius: '5px',
    fontFamily: `"Courier New", Courier, monospace`,
    background: 'rgba(0, 0, 0, 0.05)',
    outline: 'none',
    fontSize: `${Sizes.FontSize}px`,
    padding: `${Sizes.Padding}px`,
    border: 'none',
    resize: 'none',
    width: '100%',
  });

  doAddInnerShadow(textArea);

  Object.defineProperty(textArea, 'widthUnits', {
    set: (widthUnits) => {
      textArea.style.maxWidth = `${widthUnits * Sizes.Unit}px`;
    },
  });
  Object.defineProperty(textArea, 'heightUnits', {
    set: (heightUnits) => {
      textArea.style.height = `${heightUnits * Sizes.Unit}px`;
    },
  });
  return textArea;
};

module.exports = TextArea;
