const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ProjectNameInputContainer = (_, children) => {
  const element = compose(
    'span',
    () => ({
      style: {
        // TODO: Make this one align nicely next to the input
        color: 'dimgray',
        height: '64px',
        padding: '8px',
        lineHeight: '64px',
        fontSize: '16px',
        width: 'calc(100% - 128px)',
        display: 'inline-block',
        boxSizing: 'border-box',
      },
    }),
    children
  );
  return element;
};

module.exports = ProjectNameInputContainer;
