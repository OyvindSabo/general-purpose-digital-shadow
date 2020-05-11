const { doUpdateChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');

const HorizontalNavigator = () => {
  // Create base element
  const divElement = document.createElement('div');

  // Define setters
  Object.defineProperty(divElement, 'heightUnits', {
    set: (heightUnits) => {
      divElement.style.height = `${heightUnits * 20}px`;
    },
  });
  Object.defineProperty(divElement, 'children', {
    set: (children) => {
      doUpdateChildren(divElement, children);
    },
  });
  return divElement;
};

module.exports = HorizontalNavigator;
