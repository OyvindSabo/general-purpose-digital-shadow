const { doUpdateChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');
const { Sizes } = include('src/libraries/simpleUI/Constants.js');

const PaddedContainer = () => {
  // Create base element
  const divElement = document.createElement('div');
  divElement.style.padding = `${Sizes.Padding}px`;

  // Define setters
  Object.defineProperty(divElement, 'widthUnits', {
    set: (widthUnits) => {
      divElement.style.maxWidth = `${widthUnits * 20}px`;
    },
  });
  Object.defineProperty(divElement, 'children', {
    set: (children) => {
      doUpdateChildren(divElement, children);
    },
  });
  return divElement;
};

module.exports = PaddedContainer;
