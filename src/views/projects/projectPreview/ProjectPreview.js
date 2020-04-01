const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);

const ProjectPreview$ = (...children) =>
  ProjectPreviewContainer$(
    styled({
      padding: '0 16px',
    })(div$)(...children)
  );
module.exports = ProjectPreview$;
