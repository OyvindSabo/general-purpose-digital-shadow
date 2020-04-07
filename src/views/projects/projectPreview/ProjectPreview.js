const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);
const ProjectPreviewButton$ = include(
  'src/views/projects/projectPreviewButton/ProjectPreviewButton.js'
);

const ProjectPreview$ = ({ viewModel, id$, name$ }) =>
  ProjectPreviewContainer$(
    styled({
      padding: '0 16px',
      width: 'calc(100% - 128px)',
      boxSizing: 'border-box',
      display: 'inline-block',
    })(div$)(name$).onClick(
      () =>
        (location.hash = `#!/projects/${id$.value}/${
          viewModel.lastVisitedProjectView$.value || ''
        }`)
    ),
    ProjectPreviewButton$('Delete').onClick(() =>
      viewModel.deleteProject(id$.value)
    ),
    ProjectPreviewButton$('Edit').onClick(() =>
      viewModel.editProjectName(id$.value)
    )
  );
module.exports = ProjectPreview$;
