import express from "express";
import db from "../../../database.js";
import { requireApiKey } from "../middleware/auth.js";

const router = express.Router();

// Machine-to-machine metrics endpoint.
router.get("/", requireApiKey, async (req, res) => {
  try {
    const snippetCountRow = await db("snippets").count({ count: "id" }).first();
    const userCountRow = await db("users").count({ count: "id" }).first();

    res.json({
      metrics: {
        snippets: Number(snippetCountRow?.count ?? 0),
        users: Number(userCountRow?.count ?? 0),
      },
    });
  } catch (err) {
    console.error("Error fetching metrics:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
