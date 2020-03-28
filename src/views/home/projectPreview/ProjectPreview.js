const styled = include('src/libraries/styled/styled.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const ProjectPreview$ = withShadow(
  styled({
    color: 'dimgray',
    margin: '32px',
    padding: '16px',
    // Height + margin = 2 x navigator buttons
    height: '96px',
    verticalAlign: 'top',
    background: 'white',
    fontSize: '16px',
    boxSizing: 'border-box',
  })(div$)
);

module.exports = ProjectPreview$;
