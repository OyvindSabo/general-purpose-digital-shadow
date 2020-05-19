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
  const element = compose(
    'span',
    () => {
      const { isSelected } = getProps();
      return {
        style: `display: inline-block;
                text-align: center;
                box-sizing: border-box;
                width: 160px;
                height: 40px;
                line-height: 40px;
                font-size: 15px;
                border-bottom: ${getBorderBottom(isSelected)};`,
      };
    },
    [
      compose(
        'a',
        () => {
          const { isSelected, href } = getProps();
          return {
            style: `text-decoration: none;
                    display: inline-block;
                    width: 100%;
                    color: ${getColor(isHovered, isSelected)};`,
            href,
            onmouseenter: () => {
              isHovered = true;
              element.update();
            },
            onmouseleave: () => {
              isHovered = false;
              element.update();
            },
            innerText: getProps().label,
          };
        },
        []
      ),
    ]
  );
  return Object.assign(element, { key: 'navigation-button' });
};

module.exports = NavigationButton;
