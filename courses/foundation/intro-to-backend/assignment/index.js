import express from "express";
import knex from "knex";

const dbFile = "./database.sqlite3";

const app = express();
const port = 3000;

const knexInstance = knex({
  client: "sqlite3",
  connection: {filename: dbFile},
  useNullAsDefault: true,
});

app.get("/users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC");
  res.json(rows);
});

app.get("/only-names", async (req, res) => {
  const rows = await knexInstance.raw(
    "SELECT first_name, last_name FROM users ORDER BY id ASC"
  );
  res.json(rows);
});

app.get("/only-emails", async (req, res) => {
  const rows = await knexInstance.raw(
    "SELECT email FROM users ORDER BY email ASC"
  );
  res.json(rows);
});

app.get("/user-count", async (req, res) => {
  const rows = await knexInstance.raw("SELECT COUNT(id) AS count FROM users");
  res.json(rows[0]);
});

app.get("/confirmed-users", async (req, res) => {
  const rows = await knexInstance.raw(
    "SELECT * FROM users WHERE confirmed_at IS NOT NULL"
  );
  res.json(rows);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const rows = await knexInstance.raw("SELECT * FROM users WHERE id = ?", [id]);

  if (rows.length > 0) {
    res.json(rows[0]);
  } else {
    res.status(404).json({error: "User not found"});
  }
});

app.get("/", (req, res) => res.send(htmlTemplate));

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);

const htmlTemplate = `
  <div style="text-align: center; margin-top: 50px;">
    <h1 style="color: red;">User Count</h1>
    <div id="count" style="color: blue; font-size: 2rem;">Loading...</div>
    <p style="color: grey;">Data fetched from API: /user-count</p>
  </div>
  <script>
  async function getUserCount() {
    try {
        const response = await fetch('/user-count');
        const data = await response.json();
        document.getElementById('count').innerText = data.count;
        } catch (error) {
        document.getElementById('count').innerText = "Error";
        }
    }
          
    getUserCount();
  </script>
`;
