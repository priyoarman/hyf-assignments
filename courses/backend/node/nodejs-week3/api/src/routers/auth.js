import crypto from "crypto";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../../database.js";
import { requireAuth, authToken } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET ?? "default_jwt_secret_for_dev";
const TOKEN_TTL_MS = 1000 * 60 * 60 * 2; // 2 hours

async function authenticateUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await db("users").where({ email: normalizedEmail }).first();

  if (!user || !user.password) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  return passwordMatches ? user : null;
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login-token", async (req, res) => {
  const { email, password } = req.body;
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const tokenValue = crypto.randomBytes(32).toString("hex");
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

    await db("tokens").insert({
      user_id: user.id,
      token: tokenValue,
      created_at: createdAt,
      expires_at: expiresAt,
    });

    res.status(200).json({ token: tokenValue });
  } catch (err) {
    console.error("Login-token error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout-token", authToken, async (req, res) => {
  if (!req.authToken) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    await db("tokens").where({ token: req.authToken }).del();
    res.status(200).json({ message: "Token logged out successfully" });
  } catch (err) {
    console.error("Logout-token error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
