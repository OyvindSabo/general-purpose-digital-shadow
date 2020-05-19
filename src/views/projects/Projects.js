const ProjectPreview = include(
  'src/views/projects/projectPreview/ProjectPreview.js'
);
const ProjectNameInput = include(
  'src/views/projects/projectNameInput/ProjectNameInput.js'
);
const NewProject = include('src/views/projects/newProject/NewProject.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => { viewModel, state }
const Projects = (getProps) => {
  const element = compose(
    'div',
    {},
    getProps()
      .state.projects.filter(({ isEmpty }) => !isEmpty)
      .map(({ id, name, nameInputValue, isEditing, isEmpty }) =>
        isEditing
          ? ProjectNameInput(() => ({
              viewModel: getProps().viewModel,
              id,
              nameInputValue,
            }))
          : ProjectPreview(() => ({
              state: getProps().state,
              viewModel: getProps().viewModel,
              id,
              name,
            }))
      ),
    NewProject(getProps)
  );
  return Object.assign(element, { key: 'projects' });
};

module.exports = Projects;
