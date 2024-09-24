import * as dotenv from "dotenv"
dotenv.config()
import { changeFormatProjects, changeFormatTasks, changeFormatUsers, writeInFile } from "./helpers"

import {getProjects, getTasks, getUsers} from './apiCalls'
import { mapper } from "./mapper";


async function main() {
  try {
    const projectsData = await getProjects();
    const tasksData = await getTasks()
    const usersData = await getUsers()
    const projects = changeFormatProjects(projectsData);
    const tasks = changeFormatTasks(tasksData)
    const users = changeFormatUsers(usersData)
    const mergedData = mapper(projects, tasks, users)
    const res = await writeInFile(mergedData)
    console.log(res)
  } catch (e) {
    console.log(e);
  }
}
main();