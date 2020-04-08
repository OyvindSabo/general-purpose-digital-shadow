const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);
const ApiInputLabel$ = include(
  'src/views/dataSources/apiInputLabel/ApiInputLabel.js'
);
const Input$ = include('src/components/input/Input.js');
const ApiInputContainer$ = include(
  'src/views/dataSources/apiInputContainer/ApiInputContainer.js'
);

const ApiUrlInput$ = ({ viewModel }) =>
  ProjectPreviewContainer$(
    ApiInputLabel$('API URL'),
    ApiInputContainer$(
      Input$(viewModel.selectedApiUrl$).onInput(({ value }) => {
        viewModel.updateApiUrl(viewModel.selectedProjectId$.value, value);
      })
    )
  );

module.exports = ApiUrlInput$;
