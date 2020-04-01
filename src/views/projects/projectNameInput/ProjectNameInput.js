const styled = include('src/libraries/styled/styled.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { input$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);

const ProjectNameInput$ = value$ =>
  withShadow(ProjectPreviewContainer$)(
    styled({
      color: 'dimgray',
      height: '64px',
      padding: '0 16px',
      background: 'white',
      lineHeight: '64px',
      fontSize: '16px',
      display: 'inline-block',
      width: '100%',
    })(input$)(value$)
  );

module.exports = ProjectNameInput$;
