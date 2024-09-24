import * as fs from "fs";
import {
  IData,
  IProjectData,
  IProjectsData,
  ITaskData,
  ITasksData,
  IUserData,
  IUsersData,
} from "./types";

function changeFormatProjects(data: IProjectsData) {
  const projects = data.map((project: IProjectData) => {
    return {
      id: project.id,
      title: project.title,
    };
  });
  return projects;
}

function changeFormatTasks(data: ITasksData) {
  const tasks = data.map((task: ITaskData) => {
    const {
      id,
      title,
      status,
      parentIds,
      superParentIds,
      responsibleIds,
      createdDate,
      updatedDate,
      permalink,
    } = task;

    let collections = [];
    if (superParentIds.length > 0) {
      collections = superParentIds;
    } else {
      collections = parentIds;
    }
    return {
      id,
      name: title,
      status,
      collections,
      assignees: responsibleIds,
      created_at: createdDate,
      updated_at: updatedDate,
      ticket_url: permalink,
    };
  });

  return tasks;
}

function changeFormatUsers(data: IUsersData) {
  const realUsers = data.filter((user: IUserData) => {
    const { type, primaryEmail } = user;
    return type === "Person" && !primaryEmail.includes("wrike-robot.com");
  });

  const users = realUsers.map((user: IUserData) => {
    const { id, firstName, lastName, title, primaryEmail } = user;

    return {
      id,
      firstName,
      lastName,
      title,
      primaryEmail,
    };
  });

  return users;
}

async function writeInFile(data: IData[]) {
  return new Promise((res, rej) => {
    fs.writeFile("tasks.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        rej(err);
      } else {
        res("File has been written successfully");
      }
    });
  });
}

export { changeFormatProjects, changeFormatTasks, changeFormatUsers, writeInFile };
