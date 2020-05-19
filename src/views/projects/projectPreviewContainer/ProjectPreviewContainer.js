const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ProjectPreviewContainer = (_, children) => {
  const element = compose(
    'div',
    {
      style: `color: dimgray;
              margin: 32px 32px 0 32px;
              height: 64px;
              background: white;
              line-height: 64px;
              font-size: 16px;`,
    },
    children
  );
  return Object.assign(element, { key: 'project-preview-container' });
};

module.exports = ProjectPreviewContainer;
