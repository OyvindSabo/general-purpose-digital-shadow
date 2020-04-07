const styled = include('src/libraries/styled/styled.js');
const { input$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);

const ApiIntervalInput$ = ({ viewModel }) =>
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
    })(input$)(viewModel.selectedApiInterval$)
      .setProps({ type: 'number', min: '0' })
      .onInput(({ value }) => {
        viewModel.updateApiInterval(viewModel.selectedProjectId$.value, value);
      })
  );

module.exports = ApiIntervalInput$;
