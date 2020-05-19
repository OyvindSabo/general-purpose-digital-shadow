const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const TextButton = (getProps) => {
  let isHovered = false;
  const element = compose(
    'button',
    () => {
      const { innerText, onclick } = getProps();
      return {
        innerText,
        onclick,
        onmouseenter: () => {
          isHovered = true;
          element.update();
        },
        onmouseleave: () => {
          isHovered = false;
          element.update();
        },
        style: `color: ${isHovered ? 'darkslategray' : 'slategray'};
                background: none;
                height: 40px;
                line-height: 40px;
                font-size: 15px;
                width: 100%;
                text-align: left;
                border: none;
                outline: none;
                cursor: pointer;`,
      };
    },
    []
  );
  return Object.assign(element, { key: 'text-button' });
};

module.exports = TextButton;
