const { doPatchChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');

const Container = () => {
  // Create base element
  const divElement = document.createElement('div');
  Object.assign(divElement.style, {
    display: 'inline-block',
    width: '100%',
  });

  // Define setters
  Object.defineProperty(divElement, 'widthUnits', {
    set: (widthUnits) => {
      divElement.style.maxWidth = `${widthUnits * 20}px`;
    },
  });
  Object.defineProperty(divElement, 'children', {
    set: (children) => {
      doPatchChildren(divElement, children);
    },
  });
  return divElement;
};

module.exports = Container;
