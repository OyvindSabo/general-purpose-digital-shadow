const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreview$ = include(
  'src/views/projects/projectPreview/ProjectPreview.js'
);

const Projects$ = ({ model }) => {
  return div$(
    ...Array.from(model.projects.entries()).map(([id, name]) =>
      ProjectPreview$(name).onClick(
        () =>
          (location.hash = `#!/projects/${id}/${model.lastVisitedProjectView$
            .value || ''}`)
      )
    )
  );
};

module.exports = Projects$;
