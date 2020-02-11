const db = require("../data/db-config");

module.exports = {
  getProjects,
  getProjectsById,
  getProjectTasks,
  getProjectResources
};

function getProjects() {
  return db("projects");
}

function getProjectsById(id) {
  return db("projects")
    .where("projects.id", id)
    .first()
    .then(project => {
      // return db("tasks").where("project_id", project.id);
      // // return project;

      const tasks = new propmise(db("tasks").where("project_id", project.id));

      return {
        ...project,
        tasks: tasks
      };
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

function getProjectResources(id) {
  return db("resources as r")
    .join("project_resources as pr", "pr.resource_id", "r.id")
    .join("projects as p", "p.id", "pr.project_id")
    .select("r.name")
    .where("pr.project_id", id);
}
