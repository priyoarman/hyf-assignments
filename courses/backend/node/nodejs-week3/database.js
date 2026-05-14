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
      table.string("role").notNullable().defaultTo("user");
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

  const hasRoleColumn = await knexInstance.schema.hasColumn("users", "role");
  if (!hasRoleColumn) {
    await knexInstance.schema.alterTable("users", (table) => {
      table.string("role").notNullable().defaultTo("user");
    });
    console.log("Added role column to users table.");
  }
}

async function ensureTokensTable() {
  const hasTokensTable = await knexInstance.schema.hasTable("tokens");

  if (!hasTokensTable) {
    await knexInstance.schema.createTable("tokens", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("token").notNullable().unique();
      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knexInstance.fn.now());
      table.timestamp("expires_at").nullable();
    });
    console.log("Created tokens table in the database.");
  }
}

async function seedDefaultUsers() {
  const usersToSeed = [
    {
      name: "Admin User",
      email: "admin@example.com",
      age: 30,
      role: "admin",
      password: "Password123!",
    },
    {
      name: "Standard User",
      email: "user@example.com",
      age: 25,
      role: "user",
      password: "Password123!",
    },
  ];

  for (const seed of usersToSeed) {
    const existingUser = await knexInstance("users")
      .where({ email: seed.email })
      .first();

    const hashedPassword = await bcrypt.hash(seed.password, 10);

    if (existingUser) {
      const updateData = {};
      if (!existingUser.password) {
        updateData.password = hashedPassword;
      }
      if (!existingUser.role) {
        updateData.role = seed.role;
      }
      if (Object.keys(updateData).length > 0) {
        await knexInstance("users")
          .where({ id: existingUser.id })
          .update(updateData);
        console.log(
          `Updated seed user ${seed.email} with missing credentials or role.`,
        );
      }
    } else {
      await knexInstance("users").insert({
        name: seed.name,
        email: seed.email,
        age: seed.age,
        role: seed.role,
        password: hashedPassword,
      });
      console.log(`Inserted seed user ${seed.email} with role ${seed.role}.`);
    }
  }
}

export async function initDatabase() {
  try {
    await ensureUsersTable();
    await ensureTokensTable();
    await seedDefaultUsers();
  } catch (err) {
    console.error("Database initialization failed:", err);
    throw err;
  }
}

export default knexInstance;
