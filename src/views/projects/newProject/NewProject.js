const Observable = include('src/libraries/observable/Observable.js');
const { span$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const NewProject$ = ({ viewModel }) => {
  const color$ = new Observable('slategray');
  return span$('New project')
    .setStyle({
      color: color$,
      margin: '32px',
      padding: '0 16px',
      height: '64px',
      background: 'none',
      lineHeight: '64px',
      fontSize: '16px',
      display: 'inline-block',
    })
    .onMouseEnter(() => (color$.value = 'darkslategray'))
    .onMouseLeave(() => (color$.value = 'slategray'))
    .onClick(viewModel.createNewProject);
};

module.exports = NewProject$;
