import knex from "knex";

const dbFile = "../database/schema/hyf_node_week1.sqlite3";

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
});

export default knexInstance;
