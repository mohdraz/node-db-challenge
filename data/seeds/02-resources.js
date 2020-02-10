exports.seed = function(knex) {
  return knex("resources").insert([
    { name: "visual stuido code", description: "microsft product for free" },
    { name: "w3 school", description: "check standards" },
    { name: "computer" },
    { name: "java software", description: "new software" },
    { name: "chrome", description: "browser" }
  ]);
};
