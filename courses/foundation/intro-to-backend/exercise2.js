import express from "express";
import knex from "knex";

const dbFile = "./database.sqlite3";

const app = express();
const port = 3000;

// This connects to the database stored in the file mentioned below
const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
  useNullAsDefault: true, // Omit warning in console
});

app.get("/", (req, res) => {
  res.send(`
      <h1>Main Page</h1>
      <p>Hello from Exercise 2!</p>
  `);
});

// Here is an example of the first route, /all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC;");
  res.json(rows);
});
// TODO implement more routes here

app.get("/only-names", async (req, res) => {
  const nameRows = await knexInstance.raw(
    "SELECT first_name, last_name FROM users ORDER BY id ASC;"
  );
  res.json(nameRows);
});

app.get("/only-emails", async (req, res) => {
  const emailRows = await knexInstance.raw(
    "SELECT email FROM users ORDER BY email ASC;"
  );
  res.json(emailRows);
});

app.post("/status", async (request, response) => {
  const {id, name} = request.body;

  if (!id || !name || name.length === 0) return response.sendStatus(400);

  await knex.raw(`insert into status(id, name) values(${id}, "${name}")`);
  response.sendStatus(200);
});

app.listen(port, () => {
  console.log(
    `Server is listening. Go to http://localhost:${port} on browser or Postman`
  );
});
