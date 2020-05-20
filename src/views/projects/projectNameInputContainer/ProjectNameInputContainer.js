const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ProjectNameInputContainer = (getProps) => {
  const element = compose(
    'input',
    () => {
      const { value, oninput } = getProps();
      return {
        // TODO: Make this one align nicely next to the input
        value,
        oninput,
        style: `color: dimgray;
              height: 64px;
              padding: 8px;
              line-height: 64px;
              font-size: 16px;
              width: calc(100% - 128px);
              display: inline-block;
              box-sizing: border-box;`,
      };
    },
    []
  );
  return element;
};

module.exports = ProjectNameInputContainer;
