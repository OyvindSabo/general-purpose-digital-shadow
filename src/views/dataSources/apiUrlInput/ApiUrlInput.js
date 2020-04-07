const styled = include('src/libraries/styled/styled.js');
const { input$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);

const ApiUrlInput$ = ({ viewModel }) =>
  ProjectPreviewContainer$(
    styled({
      color: 'dimgray',
      height: '64px',
      padding: '0 16px',
      lineHeight: '64px',
      fontSize: '16px',
      width: '100%',
      border: 'none',
      outline: 'none',
    })(input$)(viewModel.selectedApiUrl$).onInput(({ value }) => {
      viewModel.updateApiUrl(viewModel.selectedProjectId$.value, value);
    })
  );

module.exports = ApiUrlInput$;
