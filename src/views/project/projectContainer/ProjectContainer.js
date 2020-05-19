const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ProjectContainer = (props, children) => {
  const element = compose(
    'div',
    {
      style: `height: calc(100% - 64px);
              position: absolute;
              left: 0;
              right: 0;`,
    },
    children
  );
  return element;
};

module.exports = ProjectContainer;
