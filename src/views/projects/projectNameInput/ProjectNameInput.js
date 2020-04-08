const styled = include('src/libraries/styled/styled.js');
const { input$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreviewButton$ = include(
  'src/views/projects/projectPreviewButton/ProjectPreviewButton.js'
);
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);
const Input$ = include('src/components/input/Input.js');
const ProjectNameInputContainer$ = include(
  'src/views/projects/projectNameInputContainer/ProjectNameInputContainer.js'
);

const ProjectNameInput$ = ({ viewModel, id$, nameInputValue$ }) =>
  ProjectPreviewContainer$(
    ProjectNameInputContainer$(
      Input$(nameInputValue$).onInput(({ value }) => {
        viewModel.setProjectNameInputValue(id$.value, value);
      })
    ),
    ProjectPreviewButton$('Cancel').onClick(() =>
      viewModel.cancelEditingProjectName(id$.value)
    ),
    ProjectPreviewButton$('Save').onClick(() =>
      viewModel.saveProjectName(id$.value)
    )
  );

module.exports = ProjectNameInput$;
