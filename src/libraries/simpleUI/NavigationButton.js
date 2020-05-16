const { Colors } = include('src/libraries/simpleUI/Constants.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const getColor = (isHovered, isSelected) => {
  return isSelected || isHovered
    ? Colors.HighlightedTextColor
    : Colors.TextColor;
};

const getBorderBottom = (isSelected) => {
  return isSelected ? `2px solid ${Colors.HighlightColor}` : 'none';
};

const NavigationButton = (getProps) => {
  let isHovered = false;
  const { label, href, isSelected } = getProps();
  const props = { label, href, isSelected };
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
          fontSize: '30px',
          borderBottom: getBorderBottom(isSelected),
          color: getColor(isHovered, isSelected),
        },
      };
    },
    [
      compose(
        'a',
        () => ({
          style: {
            textDecoration: 'none',
            display: 'inline-block',
            width: '100%',
          },
          href: getProps().href,
          onmouseenter: () => {
            isHovered = true;
            element.update();
          },
          onMouseLeave: () => {
            isHovered = false;
            element.update();
          },
        }),
        [props.label]
      ),
    ]
  );
  return element;
};

module.exports = NavigationButton;
