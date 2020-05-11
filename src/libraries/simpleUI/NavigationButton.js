const { Colors } = include('src/libraries/simpleUI/Constants.js');

const NavigationButton = () => {
  // Create base element
  const spanElement = document.createElement('span');
  const aElement = document.createElement('a');
  Object.assign(spanElement.style, {
    display: 'inline-block',
    textAlign: 'center',
    boxSizing: 'border-box',
  });
  Object.assign(aElement.style, {
    textDecoration: 'none',
    display: 'inline-block',
    width: '100%',
  });
  spanElement.appendChild(aElement);

  const state = {};

  // Define setters
  Object.defineProperty(spanElement, 'widthUnits', {
    set: (widthUnits) => {
      state.widthUnits = widthUnits;
      spanElement.style.width = `${widthUnits * 20}px`;
    },
  });
  Object.defineProperty(spanElement, 'heightUnits', {
    set: (heightUnits) => {
      state.heightUnits = heightUnits;
      spanElement.style.height = `${heightUnits * 20}px`;
      spanElement.style.lineHeight = `${heightUnits * 20}px`;
      aElement.style.fontSize = `${(heightUnits / 2) * 15}px`;
    },
  });
  Object.defineProperty(spanElement, 'title', {
    set: (title) => {
      state.title = title;
      aElement.innerText = title;
    },
  });
  Object.defineProperty(spanElement, 'href', {
    set: (href) => {
      state.href = href;
      aElement.href = href;
    },
  });
  Object.defineProperty(spanElement, 'isSelected', {
    set: (isSelected) => {
      state.isSelected = isSelected;
      spanElement.style.borderBottom = isSelected
        ? '2px solid limegreen'
        : 'none';
      aElement.style.color = isSelected
        ? Colors.HighlightedTextColor
        : Colors.TextColor;
    },
  });

  // Define event listeners
  aElement.onmouseenter = () => {
    aElement.style.color = Colors.HighlightedTextColor;
  };
  aElement.onmouseleave = () => {
    aElement.style.color = state.isSelected
      ? Colors.HighlightedTextColor
      : Colors.TextColor;
  };
  return spanElement;
};

module.exports = NavigationButton;
