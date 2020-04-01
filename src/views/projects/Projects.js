const { If$ } = include('src/libraries/observableHtml/utils.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const { not$, map$, startsWith$, choose$ } = include(
  'src/libraries/observable/utils.js'
);
const ProjectPreview$ = include(
  'src/views/projects/projectPreview/ProjectPreview.js'
);
const NewProject$ = include('src/views/projects/newProject/NewProject.js');

const Projects$ = ({ model }) => {
  return div$(
    ...model.projects.map(({ id$, name$, isEditing$, isEmpty$ }) =>
      If$(
        not$(isEmpty$),
        ProjectPreview$(name$).onClick(
          () =>
            (location.hash = `#!/projects/${id$.value}/${model
              .lastVisitedProjectView$.value || ''}`)
        )
      )
    ),
    NewProject$({ model })
  );
};

module.exports = Projects$;
