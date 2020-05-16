const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => value
const ProjectPreviewButton = (getProps) => {
  let isHovered = false;
  const element = compose(
    'button',
    () => ({
      onmouseenter: () => {
        isHovered = true;
        element.update();
      },
      onmouseleave: () => {
        isHovered = false;
        element.update();
      },
      style: {
        color: isHovered ? 'darkslategray' : 'slategray',
        height: '64px',
        background: 'white',
        lineHeight: '64px',
        fontSize: '16px',
        width: '64px',
        textAlign: 'center',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
      },
    }),
    [getProps().value]
  );
  return element;
};

module.exports = ProjectPreviewButton;
