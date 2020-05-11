const CenteredContainer = () => {
  // Create base element
  const divElement = document.createElement('div');
  divElement.style.margin = 'auto';

  // Define setters
  Object.defineProperty(divElement, 'widthUnits', {
    set: (widthUnits) => {
      divElement.style.maxWidth = `${widthUnits * 20}px`;
    },
  });
  return divElement;
};

module.exports = CenteredContainer;
