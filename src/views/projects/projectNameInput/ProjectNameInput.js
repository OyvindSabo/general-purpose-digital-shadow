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
const ProjectNameInput = ({ viewModel, id$, nameInputValue$ }) => {
  const element = ProjectPreviewContainer(() => ({}), [
    ProjectNameInputContainer(
      () => ({
        oninput: ({ value }) => {
          const { id, viewModel } = getProps();
          viewModel.setProjectNameInputValue(id, value);
        },
      }),
      [getProps().nameInputValue]
    ),
    ProjectPreviewButton(
      () => ({
        onclick: () => {
          const { id, viewModel } = getProps();
          viewModel.cancelEditingProjectName(id);
        },
      }),
      ['Cancel']
    ),
    ProjectPreviewButton(
      () => ({
        onclick: () => {
          const { id, viewModel } = getProps();
          viewModel.saveProjectName(id);
        },
      }),
      ['Save']
    ),
  ]);
  return element;
};

module.exports = ProjectNameInput;
