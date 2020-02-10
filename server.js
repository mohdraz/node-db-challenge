const express = require("express");
const helmet = require("helmet");

const ProjectRouter = require("./projects/project-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/api/projects", ProjectRouter);

server.get("/", (req, res) => {
  res.send("server is up and running");
});

module.exports = server;
