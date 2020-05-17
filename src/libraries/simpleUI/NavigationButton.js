const { Colors } = include('src/libraries/simpleUI/Constants.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const getColor = (isHovered, isSelected) => {
  console.log(
    'finding textColor: ',
    isSelected || isHovered ? Colors.HighlightedTextColor : Colors.TextColor
  );
  return isSelected || isHovered
    ? Colors.HighlightedTextColor
    : Colors.TextColor;
};

const getBorderBottom = (isSelected) => {
  return isSelected ? `2px solid ${Colors.HighlightColor}` : 'none';
};

const NavigationButton = (getProps) => {
  let isHovered = false;
  const element = compose(
    'span',
    () => {
      const { isSelected } = getProps();
      return {
        style: {
          display: 'inline-block',
          textAlign: 'center',
          boxSizing: 'border-box',
          width: '160px',
          height: '40px',
          lineHeight: '40px',
          fontSize: '15px',
          borderBottom: getBorderBottom(isSelected),
        },
      };
    },
    [
      compose(
        'a',
        () => {
          const { isSelected, href } = getProps();
          return {
            style: {
              textDecoration: 'none',
              display: 'inline-block',
              width: '100%',
              color: getColor(isHovered, isSelected),
            },
            href,
            onmouseenter: () => {
              isHovered = true;
              element.update();
            },
            onMouseLeave: () => {
              isHovered = false;
              element.update();
            },
          };
        },
        [getProps().label]
      ),
    ]
  );
  return element;
};

module.exports = NavigationButton;
