require('dotenv').config();
const { fetchData } = require("./service");
const {
  generateProjectIdList,
  changeFormat,
  writeInFile,
} = require("./helpers");
const baseUrl = `https://www.wrike.com/api/v4`;

async function control() {
  try {
    const projectsData = await getProjects();
    const projectsIds = generateProjectIdList(projectsData.data);
    const projectsTasksData = await getTasksByProjectIds(projectsIds);
    const formatedData = changeFormat(projectsTasksData);
    await writeInFile(formatedData);
  } catch (e) {
    console.log(e);
  }
}
async function getProjects() {
  const tasksData = await fetchData(
    `${baseUrl}/folders?project=true&deleted=false`
  );
  const projectsData = await tasksData.json();
  return projectsData;
}

async function getTasksByProjectIds(projectIds) {
  let allProjectsTasks = [];
  for (let projectId of projectIds) {
    const response = await fetchData(
      `${baseUrl}/folders/${projectId}/tasks?subTasks&fields=["responsibleIds"]`
    );
    const tasks = await response.json();
    allProjectsTasks.push({ projectId: projectId, tasks: tasks.data });
  }

  return allProjectsTasks;
}

control();
