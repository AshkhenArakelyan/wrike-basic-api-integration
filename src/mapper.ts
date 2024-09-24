import {
  IProjectsData,
  IUserData,
  ITasksFormatedData,
  IUsersData,
  ITaskUserMerged,
} from "./types";

function mapper(
  projects: IProjectsData,
  tasks: ITasksFormatedData,
  users: IUsersData
) {
  const projectTaskMerged: { [key: string]: ITaskUserMerged[] } = {};

  tasks.forEach((task) => {
    const {
      id,
      name,
      status,
      collections,
      assignees,
      created_at,
      updated_at,
      ticket_url,
    } = task;

    const formatedAssignees: IUserData[] = assignees
      .map((userId) => {
        const matchingUser = users.find((user) => user.id === userId);
        return matchingUser ? matchingUser : undefined;
      })
      .filter((user): user is IUserData => user !== undefined);

    const taskUserMerged: ITaskUserMerged = {
      id,
      name,
      status,
      collections,
      assignees: formatedAssignees,
      created_at,
      updated_at,
      ticket_url,
    };

    taskUserMerged.collections.forEach((projectId: string) => {
      if (!projectTaskMerged[projectId]) {
        projectTaskMerged[projectId] = [];
      }
      projectTaskMerged[projectId].push(taskUserMerged);
    });
  });

  return projects.map((project) => ({
    id: project.id,
    title: project.title,
    tasks: projectTaskMerged[project.id] || [],
  }));
}

export { mapper };
