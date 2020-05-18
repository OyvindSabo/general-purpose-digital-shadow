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
        const { id, state, name } = getProps();
        return {
          onclick: () => {
            location.hash = `#!/projects/${id}/${
              state.lastVisitedProjectView || ''
            }`;
          },
          style: `padding: 0 16px;
                  width: calc(100% - 128px);
                  box-sizing: border-box;
                  display: inline-block;`,
          innerText: name,
        };
      },
      []
    ),
    ProjectPreviewButton(
      () => ({
        innerText: 'Delete',
        onclick: () => viewModel.deleteProject(getProps().id),
      }),
      []
    ),
    ProjectPreviewButton(
      () => ({
        innerText: 'Edit',
        onclick: () => viewModel.editProjectName(id$.value),
      }),
      []
    ),
  ]);
};

module.exports = ProjectPreview;
