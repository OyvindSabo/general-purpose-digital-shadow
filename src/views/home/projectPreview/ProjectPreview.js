const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const ProjectPreview$ = styled({
  height: '64px',
  padding: '16px',
  margin: '16px',
  fontSize: '16px',
  background: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 8px -4px',
})(div$);

module.exports = ProjectPreview$;
