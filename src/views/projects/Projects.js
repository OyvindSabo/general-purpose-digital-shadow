const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreview$ = include(
  'src/views/projects/projectPreview/ProjectPreview.js'
);

const Projects$ = ({ model }) =>
  div$(
    ...model.projects.value.map(({ name, id }) =>
      ProjectPreview$(name).onClick(() => (location.hash = `#!/projects/${id}`))
    )
  );

module.exports = Projects$;
