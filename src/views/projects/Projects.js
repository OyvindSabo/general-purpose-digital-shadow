const ProjectPreview = include(
  'src/views/projects/projectPreview/ProjectPreview.js'
);
const ProjectNameInput = include(
  'src/views/projects/projectNameInput/ProjectNameInput.js'
);
const NewProject = include('src/views/projects/newProject/NewProject.js');
const { compose, Each, If } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => { viewModel, state }
const Projects = (getProps) => {
  const element = compose('div', {}, [
    Each(
      () => {
        console.log(
          'project props: ',
          getProps().state.projects.filter(({ isEmpty }) => !isEmpty)
        );
        return getProps().state.projects.filter(({ isEmpty }) => !isEmpty);
      },
      (getCurrentValue) => [
        If(
          () => getCurrentValue().isEditing,
          () => [
            ProjectNameInput(() => ({
              viewModel: getProps().viewModel,
              id: getCurrentValue().id,
              nameInputValue: getCurrentValue().nameInputValue,
            })),
          ],
          () => [
            ProjectPreview(() => ({
              state: getProps().state,
              viewModel: getProps().viewModel,
              id: getCurrentValue().id,
              name: getCurrentValue().name,
            })),
          ]
        ),
      ]
    ),
    NewProject(getProps),
  ]);
  return element;
};

module.exports = Projects;
