const ProjectPreviewContainer = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);
const ApiInputLabel = include(
  'src/views/dataSources/apiInputLabel/ApiInputLabel.js'
);
const Input$ = include('src/components/input/Input.js');
const ApiInputContainer = include(
  'src/views/dataSources/apiInputContainer/ApiInputContainer.js'
);
const { compose, doPatchChildren } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

// getProps::() => { state, viewModel }
const ApiIntervalInput = (getProps) => {
  return ProjectPreviewContainer(() => ({}), [
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
};

module.exports = ApiIntervalInput;
