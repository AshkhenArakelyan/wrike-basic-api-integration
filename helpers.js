const fs = require("fs");

function generateProjectIdList(data) {
  const projectIds = data.map((project) => project.id);
  return projectIds;
}

function changeFormat(projects) {
  return projects?.map((project) => {
    const { projectId, tasks } = project;
    const formatedTasks = tasks.map((task) => {
      const {
        id,
        title,
        responsibleIds,
        status,
        parentIds,
        createdDate,
        updatedDate,
      } = task;

      return {
        id,
        name: title,
        assignees: responsibleIds,
        status,
        collections: parentIds,
        created_at: createdDate,
        updated_at: updatedDate,
      };
    });

    return {
      collection: projectId,
      tasks: formatedTasks,
    };
  });
}

async function writeInFile(tasks) {
  fs.writeFile(
    "tasks.json",
    JSON.stringify(tasks, null, 2),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File has been written successfully");
      }
    }
  );
}
module.exports = { generateProjectIdList, changeFormat, writeInFile };
