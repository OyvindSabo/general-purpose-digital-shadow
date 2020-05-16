const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => { viewModel }
const NewProject = (getProps) => {
  let color = 'slategray';
  const element = compose(
    'span',
    () => ({
      onmouseenter: () => {
        color = 'darkslategray';
        element.update();
      },
      onmouseleave: () => {
        color = 'slategray';
        element.update();
      },
      onclick: getProps().viewModel.createNewProject,
      style: {
        color,
        margin: '32px',
        padding: '0 16px',
        height: '64px',
        background: 'none',
        lineHeight: '64px',
        fontSize: '16px',
        display: 'inline-block',
      },
    }),
    ['New project']
  );
  return element;
};

module.exports = NewProject;
