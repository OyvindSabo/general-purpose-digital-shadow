const styled = include('src/libraries/styled/styled.js');
const { button$, input$ } = include(
  'src/libraries/observableHtml/ObservableHtml.js'
);
const ProjectPreviewButton$ = include(
  'src/views/projects/projectPreviewButton/ProjectPreviewButton.js'
);
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);

const ProjectNameInput$ = ({ model, id$, nameInputValue$ }) =>
  ProjectPreviewContainer$(
    styled({
      color: 'dimgray',
      height: '64px',
      padding: '0 16px',
      lineHeight: '64px',
      fontSize: '16px',
      width: 'calc(100% - 128px)',
      border: 'none',
      outline: 'none',
    })(input$)(nameInputValue$).onInput(({ value }) => {
      model.setProjectNameInputValue(id$.value, value);
    }),
    ProjectPreviewButton$('Cancel').onClick(() =>
      model.cancelEditingProjectName(id$.value)
    ),
    ProjectPreviewButton$('Save').onClick(() =>
      model.saveProjectName(id$.value)
    )
  );

module.exports = ProjectNameInput$;
