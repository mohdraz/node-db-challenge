const express = require("express");
const Project = require("./project-model");

const router = express.Router();

router.get("/resources", (req, res) => {
  Project.getReourcesList()
    .then((myResources) => {
      res.json(myResources);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting resources" });
    });
});
router.get("/tasks", (req, res) => {
  Project.getTaskList()
    .then((myTasks) => {
      res.json(myTasks);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting tasks" });
    });
});

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

router.post("/addResources", (req, res) => {
  const newResource = req.body;
  Project.addProjectResources(newResource)
    .then((myResoruce) => {
      res.status(201).json(myResoruce);
    })
    .catch((err) => {
      res.status(500).json({ message: "error adding resources" });
    });
});

router.post("/addProject", (req, res) => {
  const newProject = req.body;
  Project.addProject(newProject)
    .then((myProject) => {
      res.status(201).json(myProject);
    })
    .catch((err) => {
      res.status(500).json({ message: "error adding project" });
    });
});

router.post("/addTask", (req, res) => {
  const newTask = req.body;
  Project.addTask(newTask)
    .then((myTask) => {
      res.status(201).json(myTask);
    })
    .catch((err) => {
      res.status(500).json({ message: "error adding task" });
    });
});

module.exports = router;
