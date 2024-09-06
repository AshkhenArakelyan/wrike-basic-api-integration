const fs = require("fs");
const requestUrl = `https://www.wrike.com/api/v4/tasks?fields=["parentIds"]`;

async function getTasks() {
  const tasksData = await fetchData();
  if (!tasksData) {
    return;
  }
  try {
    const tasks = await tasksData.json();
    const formatedTasks = changeFormat(tasks.data);
    writeInFile(formatedTasks);
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchData() {
  try {
    const response = await fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${process.env.WRIKE_PERMAMENT_ACCESS_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.status + " " + response.statusText);
    }
    return response;
  } catch (error) {
    console.error(error.name + " " + error.message);
    return null;
  }
}

function changeFormat(tasks) {
  return tasks?.map((task) => {
    const {
      id,
      title,
      accountId,
      status,
      parentIds,
      createdDate,
      updatedDate,
      permalink,
    } = task;

    return {
      id,
      name: title,
      assignee: accountId,
      status,
      collections: parentIds,
      created_at: createdDate,
      updated_at: updatedDate,
      ticket_url: permalink,
    };
  });
}

function writeInFile(tasks) {
  fs.writeFile("tasks.json", JSON.stringify(tasks), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File has been written successfully');
    }
  });
}

getTasks();
