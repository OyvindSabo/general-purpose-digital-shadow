const { doAddInnerShadow } = include('src/libraries/simpleHTML/SimpleHTML.js');
const { Sizes } = include('src/libraries/simpleUI/Constants.js');

const ExpandingTextArea = () => {
  const textArea = document.createElement('textarea');

  Object.assign(textArea.style, {
    borderRadius: '5px',
    fontFamily: `"Courier New", Courier, monospace`,
    background: 'rgba(0, 0, 0, 0.1)',
    minHeight: '10em',
    overflow: 'hidden',
    outline: 'none',
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
  Object.defineProperty(textArea, 'minHeightUnits', {
    set: (heightUnits) => {
      textArea.style.minHeight = `${heightUnits * Sizes.Unit}px`;
    },
  });
  Object.defineProperty(textArea, 'maxHeightUnits', {
    set: (heightUnits) => {
      textArea.style.maxHeight = `${heightUnits * Sizes.Unit}px`;
    },
  });

  const updateTextAreaHeight = () => {
    const previousClientHeight = textArea.clientHeight;
    const { scrollX, scrollY } = window;
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
    const newClientHeight = textArea.clientHeight;
    const scrollChange = newClientHeight - previousClientHeight;
    window.scrollTo(scrollX, scrollY + scrollChange);
  };
  textArea.addEventListener('input', updateTextAreaHeight);
  return textArea;
};

module.exports = ExpandingTextArea;
