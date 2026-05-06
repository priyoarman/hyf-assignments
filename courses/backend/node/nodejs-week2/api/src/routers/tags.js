import express from "express";
import db from "../../../database.js";

const router = express.Router();

// GET all tags
router.get("/", async (req, res) => {
  const tags = await db("tags").select("*");
  res.json(tags);
});

// POST a new tag
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Tag name is required" });

  try {
    const [newTag] = await db("tags").insert({ name }).returning("*");
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ error: "Error creating tag" });
  }
});

// GET tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tag = await db("tags").where({ id: req.params.id }).first();

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT tag
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing required field: name" });
  }

  try {
    const updatedRows = await db("tags")
      .where({ id: req.params.id })
      .update({ name });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Tag updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE tag
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await db("tags").where({ id: req.params.id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Deleted tag" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
