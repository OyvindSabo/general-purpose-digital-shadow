const styled = include('src/libraries/styled/styled.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);

const ProjectPreview$ = (...children) =>
  withShadow(ProjectPreviewContainer$)(
    styled({
      color: 'dimgray',
      height: '64px',
      padding: '0 16px',
      background: 'white',
      lineHeight: '64px',
      fontSize: '16px',
    })(div$)(...children)
  );
module.exports = ProjectPreview$;
