const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const ProjectPreview$ = include(
  'src/views/home/projectPreview/ProjectPreview.js'
);

const Home$ = ({ model }) =>
  div$(...model.projects.value.map(({ name }) => ProjectPreview$(name)));

module.exports = Home$;
