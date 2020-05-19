const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => { viewModel }
const NewProject = (getProps) => {
  let color = 'slategray';
  const element = compose(
    'span',
    () => ({
      innerText: 'New project',
      onmouseenter: () => {
        color = 'darkslategray';
        element.update();
      },
      onmouseleave: () => {
        color = 'slategray';
        element.update();
      },
      onclick: getProps().viewModel.createNewProject,
      style: `${color};
              margin: 32px;
              padding: 0 16px;
              height: 64px;
              background: none;
              line-height: 64px;
              font-size: 16px;
              display: inline-block;`,
    }),
    []
  );
  return Object.assign(element, { key: 'new-project' });
};

module.exports = NewProject;
