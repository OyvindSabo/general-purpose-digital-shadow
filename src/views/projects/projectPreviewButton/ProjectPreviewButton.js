const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => value
const ProjectPreviewButton = (getProps) => {
  let isHovered = false;
  const element = compose(
    'button',
    () => ({
      onclick: getProps().onclick,
      onmouseenter: () => {
        isHovered = true;
        element.update();
      },
      onmouseleave: () => {
        isHovered = false;
        element.update();
      },
      innerText: getProps().innerText,
      style: `color: ${isHovered ? 'darkslategray' : 'slategray'};
              height: 64px;
              background: white;
              line-height: 64px;
              font-size: 16px;
              width: 64px;
              text-align: center;
              border: none;
              outline: none;
              cursor: pointer;`,
    }),
    []
  );
  return element;
};

module.exports = ProjectPreviewButton;
