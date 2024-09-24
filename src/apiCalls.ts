import { fetchData } from "./service"
const baseUrl = `https://www.wrike.com/api/v4`;

async function getProjects() {
  const projects = await fetchData(
    `${baseUrl}/folders?project=true&deleted=false`
  );
  return projects.data;
}

async function getTasks() {
  const tasks = await fetchData(`${baseUrl}/tasks?fields=["superParentIds", "parentIds", "responsibleIds"]`);
  return tasks.data;
}

async function getUsers() {
    const users = await fetchData(`${baseUrl}/contacts`)
    return users.data
}
export { getProjects, getTasks, getUsers }
