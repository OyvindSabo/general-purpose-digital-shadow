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

const ApiIntervalInput$ = ({ viewModel }) =>
  ProjectPreviewContainer$(
    ApiInputLabel$('Fetch interval (s)'),
    ApiInputContainer$(
      Input$(viewModel.selectedApiInterval$)
        .setProps({ type: 'number', min: '0' })
        .onInput(({ value }) => {
          viewModel.updateApiInterval(
            viewModel.selectedProjectId$.value,
            value
          );
        })
    )
  );

module.exports = ApiIntervalInput$;
