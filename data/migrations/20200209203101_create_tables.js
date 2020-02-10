exports.up = function(knex) {
  return knex.schema
    .createTable("resources", tbl => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.varchar("description", 256);
    })
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.varchar("description", 256);
      tbl
        .boolean("completed")
        .defaultTo("false")
        .notNullable();
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.varchar("description", 256).notNullable();
      tbl.string("notes", 256);
      tbl
        .boolean("completed")
        .defaultTo("false")
        .notNullable();
      tbl
        .integer("project_id")
        .notNullable()
        .unsigned()
        .references("projects.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("project_resources", tbl => {
      tbl
        .integer("project_id")
        .notNullable()
        .unsigned()
        .references("projects.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("resource_id")
        .notNullable()
        .unsigned()
        .references("resources.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["project_id", "resource_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects")
    .dropTableIfExists("resources");
};
