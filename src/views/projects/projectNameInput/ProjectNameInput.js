const styled = include('src/libraries/styled/styled.js');
const Observable = include('src/libraries/observable/Observable.js');
const { choose$ } = include('src/libraries/observable/utils.js');
const { button$, input$ } = include(
  'src/libraries/observableHtml/ObservableHtml.js'
);
const ProjectPreviewContainer$ = include(
  'src/views/projects/projectPreviewContainer/ProjectPreviewContainer.js'
);

const Button$ = value$ => {
  const isHovered$ = new Observable(false);
  return button$(value$)
    .setStyle({
      color: choose$(isHovered$, 'darkslategray', 'slategray'),
      height: '64px',
      background: 'white',
      lineHeight: '64px',
      fontSize: '16px',
      width: '64px',
      textAlign: 'center',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
    })
    .onMouseEnter(() => (isHovered$.value = true))
    .onMouseLeave(element => (isHovered$.value = false));
};

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
    Button$('Cancel'),
    Button$('Save').onClick(() => model.saveProjectName(id$.value))
  );

module.exports = ProjectNameInput$;
