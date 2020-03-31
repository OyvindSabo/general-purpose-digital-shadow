const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { map$, startsWith$, choose$ } = include(
  'src/libraries/observable/utils.js'
);
const ProjectPreview$ = include(
  'src/views/projects/projectPreview/ProjectPreview.js'
);
const NewProject$ = include('src/views/projects/newProject/NewProject.js');

const Projects$ = ({ model }) => {
  return div$(
    ...map$(model.projects$, ({ id, name, isEditing }) =>
      ProjectPreview$(name).onClick(
        () =>
          (location.hash = `#!/projects/${id}/${model.lastVisitedProjectView$
            .value || ''}`)
      )
    ).value,
    NewProject$({ model })
  );
};

module.exports = Projects$;
