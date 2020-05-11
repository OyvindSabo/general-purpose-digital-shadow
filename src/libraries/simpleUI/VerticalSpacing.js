const VerticalSpacing = () => {
  // Create base element
  const divElement = document.createElement('div');

  // Define setters
  Object.defineProperty(divElement, 'heightUnits', {
    set: (heightUnits) => {
      divElement.style.height = `${heightUnits * 20}px`;
    },
  });
  return divElement;
};

module.exports = VerticalSpacing;
