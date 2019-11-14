const knex = require("knex");
const knexDB = knex({
  client: "pg",
  connection: "postgres://localhost/justsayin"
});
