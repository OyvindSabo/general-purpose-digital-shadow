const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);
const ProjectPreviewButton$ = include(
  'src/views/projects/projectPreviewButton/ProjectPreviewButton.js'
);

const ProjectPreview$ = ({ model, id$, name$ }) =>
  ProjectPreviewContainer$(
    styled({
      padding: '0 16px',
      width: 'calc(100% - 128px)',
      boxSizing: 'border-box',
      display: 'inline-block',
    })(div$)(name$).onClick(
      () =>
        (location.hash = `#!/projects/${id$.value}/${model
          .lastVisitedProjectView$.value || ''}`)
    ),
    ProjectPreviewButton$('Delete').onClick(() =>
      model.deleteProject(id$.value)
    ),
    ProjectPreviewButton$('Edit').onClick(() =>
      model.editProjecttName(id$.value)
    )
  );
module.exports = ProjectPreview$;
