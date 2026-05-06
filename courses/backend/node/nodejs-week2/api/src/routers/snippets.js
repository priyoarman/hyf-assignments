import express from "express";
import db from "../../../database.js";

const router = express.Router();

// GET all snippets
router.get("/", async (req, res) => {
  try {
    const snippets = await db("snippets").select("*");
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all snippets with an intentionally unsafe sort parameter
router.get("/unsafe", async (req, res) => {
  let query = db("snippets").select("*");

  if ("sort" in req.query) {
    const orderBy = req.query.sort.toString();
    if (orderBy.length > 0) {
      query = query.orderByRaw(orderBy); // Vulnerable!
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET snippet by ID
router.get("/:id", async (req, res) => {
  try {
    const snippet = await db("snippets").where({ id: req.params.id }).first();
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new snippet
router.post("/", async (req, res) => {
  const { title, code } = req.body;
  if (!title || !code) {
    return res
      .status(400)
      .json({ error: "Missing required fields: title and code" });
  }

  try {
    const [newSnippet] = await db("snippets")
      .insert({ title, code })
      .returning("*");
    res.status(201).json(newSnippet);
  } catch (err) {
    res.status(500).json({ error: "Could not create snippet" });
  }
});

// PUT snippet by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedRows = await db("snippets")
      .where({ id: req.params.id })
      .update(req.body);

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json({ message: "Snippet updated successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid data provided" });
  }
});

// DELETE snippet by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await db("snippets").where({ id: req.params.id }).del();
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json({ message: "Deleted snippet" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
