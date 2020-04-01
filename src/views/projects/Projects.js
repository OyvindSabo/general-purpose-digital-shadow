const { Choose$, If$ } = include('src/libraries/observableHtml/utils.js');
const { div$, input$ } = include(
  'src/libraries/observableHtml/ObservableHtml.js'
);
const { not$, or$, map$, startsWith$, choose$ } = include(
  'src/libraries/observable/utils.js'
);
const ProjectPreview$ = include(
  'src/views/projects/projectPreview/ProjectPreview.js'
);
const ProjectNameInput$ = include(
  'src/views/projects/projectNameInput/ProjectNameInput.js'
);
const NewProject$ = include('src/views/projects/newProject/NewProject.js');

const Projects$ = ({ model }) => {
  console.log('model.projects: ', model.projects);
  return div$(
    ...model.projects.map(
      ({ id$, name$, nameInputValue$, isEditing$, isEmpty$ }) => [
        ProjectNameInput$({ model, id$, nameInputValue$ }).setStyle({
          display: choose$(or$(isEmpty$, not$(isEditing$)), 'none', 'block'),
        }),
        ProjectPreview$(name$)
          .setStyle({
            display: choose$(or$(isEmpty$, isEditing$), 'none', 'block'),
          })
          .onClick(
            () =>
              (location.hash = `#!/projects/${id$.value}/${model
                .lastVisitedProjectView$.value || ''}`)
          ),
      ]
    ),
    NewProject$({ model })
  );
};

module.exports = Projects$;
