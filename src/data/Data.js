const getAllProjects = () => {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  return projects.map(
    ({ id, name, apiRequests, derivedValuesCode, widgetsCode }) => ({
      id: id || '',
      name: name || '',
      apiRequests: apiRequests || [],
      derivedValuesCode: derivedValuesCode || '',
      widgetsCode: widgetsCode || '',
    })
  );
};

const getProjectById = (projectIdId) =>
  JSON.parse(localStorage.getItem('projects')).find(
    ({ id }) => id == projectId
  );

const createProject = (newProject) => {
  const projects = getAllProjects();
  const projectsUpdated = [
    ...projects,
    {
      ...newProject,
      id: `${Math.random()}${+new Date()}`,
    },
  ];
  localStorage.setItem('projects', JSON.stringify(projectsUpdated));
};

const updateProjectById = (projectId, project) => {
  const projects = getAllProjects();
  const projectIndex = projects.findIndex(({ id }) => id === projectId);
  if (projectIndex === -1) {
    console.warn('Tried to update nonexistent project');
    return;
  }
  Object.assign(projects[projectIndex], project);
  localStorage.setItem('projects', JSON.stringify(projects));
};

const deleteProjectById = (projectId) => {
  const projects = getAllProjects();
  const updatedProjects = projects.filter(({ id }) => id !== projectId);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
};
