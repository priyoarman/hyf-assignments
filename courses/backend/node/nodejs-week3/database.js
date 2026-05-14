import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import knex from "knex";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.resolve(
  __dirname,
  "../database/schema/hyf_node_week1.sqlite3",
);

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
  useNullAsDefault: true,
});

async function ensureUsersTable() {
  const hasUsersTable = await knexInstance.schema.hasTable("users");

  if (!hasUsersTable) {
    await knexInstance.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.integer("age").notNullable();
      table.text("password");
    });
    console.log("Created users table in the database.");
  }

  const hasPasswordColumn = await knexInstance.schema.hasColumn(
    "users",
    "password",
  );

  if (!hasPasswordColumn) {
    await knexInstance.schema.alterTable("users", (table) => {
      table.text("password");
    });
    console.log("Added password column to users table.");
  }
}

async function seedDefaultUser() {
  const seedEmail = "admin@example.com";
  const seedPassword = "Password123!";
  const existingUser = await knexInstance("users")
    .where({ email: seedEmail })
    .first();

  if (!existingUser || !existingUser.password) {
    const hashedPassword = await bcrypt.hash(seedPassword, 10);

    if (existingUser) {
      await knexInstance("users")
        .where({ id: existingUser.id })
        .update({ password: hashedPassword });
      console.log(
        `Updated password for existing user ${seedEmail} in users table.`,
      );
    } else {
      await knexInstance("users").insert({
        name: "Admin User",
        email: seedEmail,
        age: 30,
        password: hashedPassword,
      });
      console.log(
        `Inserted seed user ${seedEmail} with a hashed password into users table.`,
      );
    }
  }
}

export async function initDatabase() {
  try {
    await ensureUsersTable();
    await seedDefaultUser();
  } catch (err) {
    console.error("Database initialization failed:", err);
    throw err;
  }
}

export default knexInstance;
