exports.up = function(knex) {
  return knex.schema.createTable("language", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("iso_code")
      .notNull()
      .unique();
    t.string("name")
      .notNull()
      .unique();
    t.timestamps(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("language");
};
