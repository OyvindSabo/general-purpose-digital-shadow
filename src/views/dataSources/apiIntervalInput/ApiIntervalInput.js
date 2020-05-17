const ProjectPreviewContainer = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);
const ApiInputLabel = include(
  'src/views/dataSources/apiInputLabel/ApiInputLabel.js'
);
const ApiInputContainer = include(
  'src/views/dataSources/apiInputContainer/ApiInputContainer.js'
);

// getProps::() => { state, viewModel }
const ApiIntervalInput = (getProps) => {
  const element = ProjectPreviewContainer(() => ({}), [
    ApiInputLabel(() => ({ label: 'Fetch interval (s)' })),
    ApiInputContainer(
      () => ({
        type: 'number',
        min: '0',
        oninput: ({ value }) => {
          viewModel.updateApiInterval(state.selectedProjectId, value);
        },
      }),
      [getProps().state.selectedApiInterval]
    ),
  ]);
  return element;
};

module.exports = ApiIntervalInput;
