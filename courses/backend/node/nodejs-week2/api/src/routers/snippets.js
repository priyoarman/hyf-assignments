import express from "express";
import db from "../../../database.js";

const router = express.Router();

// GET all snippets
router.get("/", async (req, res) => {
  try {
    const snippets = await db("snippets").select("*");
    res.json(snippets);
  } catch (err) {
    console.error("Error fetching all snippets:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all snippets with a safe sort parameter
router.get("/unsafe", async (req, res) => {
  let query = db("snippets").select("*");

  if ("sort" in req.query) {
    const sort = req.query.sort.toString().trim();
    if (sort.length > 0) {
      const [column, direction = "ASC"] = sort.split(/\s+/);
      const allowedColumns = new Set(["id", "title"]);
      const allowedDirections = new Set(["ASC", "DESC"]);
      const normalizedDirection = direction.toUpperCase();

      if (
        !allowedColumns.has(column) ||
        !allowedDirections.has(normalizedDirection)
      ) {
        return res.status(400).json({ error: "Invalid sort parameter" });
      }

      query = query.orderBy(column, normalizedDirection);
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error("Error fetching sorted snippets:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET public snippets feed
router.get("/public", async (req, res) => {
  try {
    const snippets = await db("snippets").select("*").where("is_private", 0);
    res.json(snippets);
  } catch (err) {
    console.error("Error fetching public snippets:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET snippets by tag-like text search
router.get("/tag/:tag", async (req, res) => {
  const { tag } = req.params;
  if (!tag || typeof tag !== "string" || tag.trim().length === 0) {
    return res.status(400).json({ error: "Invalid tag parameter" });
  }

  try {
    const snippets = await db("snippets")
      .select("*")
      .where("title", "like", `%${tag.trim()}%`)
      .orWhere("contents", "like", `%${tag.trim()}%`);

    res.json(snippets);
  } catch (err) {
    console.error("Error fetching snippets by tag:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET snippet by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid snippet ID" });
  }

  try {
    const snippet = await db("snippets").where({ id }).first();
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json(snippet);
  } catch (err) {
    console.error("Error fetching snippet by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new snippet
router.post("/", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string" });
  }
  if (
    !contents ||
    typeof contents !== "string" ||
    contents.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Contents is required and must be a non-empty string" });
  }

  try {
    const [newSnippet] = await db("snippets")
      .insert({ title: title.trim(), contents: contents.trim() })
      .returning("*");
    res.status(201).json(newSnippet);
  } catch (err) {
    console.error("Error creating snippet:", err);
    res.status(500).json({ error: "Could not create snippet" });
  }
});

// PUT snippet by ID
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid snippet ID" });
  }

  const { title, contents } = req.body;
  const updateData = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "Title must be a non-empty string" });
    }
    updateData.title = title.trim();
  }

  if (contents !== undefined) {
    if (typeof contents !== "string" || contents.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "Contents must be a non-empty string" });
    }
    updateData.contents = contents.trim();
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  try {
    const updatedRows = await db("snippets").where({ id }).update(updateData);

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json({ message: "Snippet updated successfully" });
  } catch (err) {
    console.error("Error updating snippet:", err);
    res.status(500).json({ error: "Could not update snippet" });
  }
});

// DELETE snippet by ID
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid snippet ID" });
  }

  try {
    const deletedRows = await db("snippets").where({ id }).del();
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json({ message: "Snippet deleted successfully" });
  } catch (err) {
    console.error("Error deleting snippet:", err);
    res.status(500).json({ error: "Could not delete snippet" });
  }
});

export default router;
