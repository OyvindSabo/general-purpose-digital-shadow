const { doPatchChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');
const { Sizes } = include('src/libraries/simpleUI/Constants.js');

const PaddedContainer = () => {
  // Create base element
  const divElement = document.createElement('div');
  Object.assign(divElement.style, {
    padding: `${Sizes.Padding}px`,
    display: 'inline-block',
    width: '100%',
  });

  // Define setters
  Object.defineProperty(divElement, 'widthUnits', {
    set: (widthUnits) => {
      divElement.style.width = `${widthUnits * 20}px`;
    },
  });
  Object.defineProperty(divElement, 'children', {
    set: (children) => {
      doPatchChildren(divElement, children);
    },
  });
  return divElement;
};

module.exports = PaddedContainer;
