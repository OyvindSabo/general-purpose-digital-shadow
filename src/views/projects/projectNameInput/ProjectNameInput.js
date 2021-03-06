const ProjectPreviewButton = include(
  'src/views/projects/projectPreviewButton/ProjectPreviewButton.js'
);
const ProjectPreviewContainer = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);
const ProjectNameInputContainer = include(
  'src/views/projects/projectNameInputContainer/ProjectNameInputContainer.js'
);

// getProps::() => { viewModel, id, nameInputValue }
const ProjectNameInput = (getProps) => {
  const element = ProjectPreviewContainer(() => ({}), [
    ProjectNameInputContainer(
      () => ({
        value: getProps().nameInputValue,
        oninput: ({ target }) => {
          const { id, viewModel } = getProps();
          viewModel.setProjectNameInputValue(id, target.value);
        },
      }),
      []
    ),
    ProjectPreviewButton(
      () => ({
        innerText: 'Cancel',
        onclick: () => {
          const { id, viewModel } = getProps();
          viewModel.cancelEditingProjectName(id);
        },
      }),
      []
    ),
    ProjectPreviewButton(
      () => ({
        innerText: 'Save',
        onclick: () => {
          const { id, viewModel } = getProps();
          viewModel.saveProjectName(id);
        },
      }),
      []
    ),
  ]);
  return element;
};

module.exports = ProjectNameInput;
