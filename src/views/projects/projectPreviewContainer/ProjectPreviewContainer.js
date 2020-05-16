const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ProjectPreviewContainer = (_, children) => {
  return compose(
    'div',
    () => ({
      style: {
        color: 'dimgray',
        margin: '32px 32px 0 32px',
        height: '64px',
        background: 'white',
        lineHeight: '64px',
        fontSize: '16px',
      },
    }),
    children
  );
};

module.exports = ProjectPreviewContainer;
