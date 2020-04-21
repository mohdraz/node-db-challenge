const express = require("express");
const Project = require("./project-model");

const router = express.Router();

router.get("/", (req, res) => {
  Project.getProjects()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving projects" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log("id : ", id);

  Project.getProjectsById(id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting the project" });
    });
});

router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;
  Project.getProjectTasks(id)
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting taks" });
    });
});

router.get("/:id/resources", (req, res) => {
  Project.getProjectResources(req.params.id)
    .then((resources) => {
      res.json(resources);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting resources" });
    });
});

module.exports = router;
