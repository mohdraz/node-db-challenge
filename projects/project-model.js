const db = require("../data/db-config");

module.exports = {
  getProjects,
  getProjectsById,
  getProjectTasks
};

function getProjects() {
  return db("projects");
}

function getProjectsById(id) {
  return db("projects")
    .where("projects.id", id)
    .first()
    .then(project => {
      let tasks = db("tasks").where("project_id", project.id);
      return {
        ...project,
        tasks: [...tasks]
      };

      // return {
      //   ...project,
      //   tasks: tasks
      // };
    });
}

function getProjectTasks(id) {
  return db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .where("t.project_id", id)
    .then(tasks =>
      tasks.map(task => {
        return {
          ...task,
          completed: task.completed === 1 ? true : false
        };
      })
    );
}

// (task.completed === 1 ? true : false)
