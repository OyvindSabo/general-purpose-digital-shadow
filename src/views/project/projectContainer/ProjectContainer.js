const { defineComponent, div } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const ProjectContainer = defineComponent((props, ...children) => {
  return div(
    {
      style: {
        height: 'calc(100% - 64px)',
        position: 'absolute',
        left: '0',
        right: '0',
      },
    },
    ...children
  );
});

module.exports = ProjectContainer;
