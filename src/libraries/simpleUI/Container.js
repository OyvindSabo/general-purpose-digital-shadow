const { doUpdateChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');

const Container = () => {
  // Create base element
  const divElement = document.createElement('div');

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

module.exports = Container;
