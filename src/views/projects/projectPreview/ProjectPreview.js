const ProjectPreviewContainer = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);
const ProjectPreviewButton = include(
  'src/views/projects/projectPreviewButton/ProjectPreviewButton.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => { state, viewModel, name, id }
const ProjectPreview = (getProps) => {
  return ProjectPreviewContainer(() => ({}), [
    compose(
      'div',
      () => {
        const { id, state } = getProps();
        return {
          onclick: () => {
            location.hash = `#!/projects/${id}/${
              state.lastVisitedProjectView || ''
            }`;
          },
          style: {
            padding: '0 16px',
            width: 'calc(100% - 128px)',
            boxSizing: 'border-box',
            display: 'inline-block',
          },
        };
      },
      [getProps().name]
    ),
    ProjectPreviewButton(
      () => ({ onclick: () => viewModel.deleteProject(getProps().id) }),
      ['Delete']
    ),
    ProjectPreviewButton(
      () => ({ onclick: () => viewModel.editProjectName(id$.value) }),
      ['Edit']
    ),
  ]);
};

module.exports = ProjectPreview;
