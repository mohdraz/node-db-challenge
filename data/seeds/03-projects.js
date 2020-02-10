exports.seed = function(knex) {
  return knex("projects").insert([
    { name: "react project", description: "build a react project with redux" },
    {
      name: "advanced react project",
      description: "build project without using react library"
    },
    { name: "new medical website" },
    { name: "html project", description: "must utilize html 5" },
    { name: "css project", description: "use of css and html required" }
  ]);
};
