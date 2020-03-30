const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreview$ = include(
  'src/views/projects/projectPreview/ProjectPreview.js'
);
const NewProject$ = include('src/views/projects/newProject/NewProject.js');

const Projects$ = ({ model }) => {
  return div$(
    ...Array.from(model.projects.entries()).map(([id, { name, isEditing }]) =>
      ProjectPreview$(name).onClick(
        () =>
          (location.hash = `#!/projects/${id}/${model.lastVisitedProjectView$
            .value || ''}`)
      )
    ),
    NewProject$({ model })
  );
};

module.exports = Projects$;
