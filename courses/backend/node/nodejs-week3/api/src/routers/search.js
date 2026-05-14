import express from "express";
import db from "../../../database.js";

const router = express.Router();

// GET search snippets by query parameter q
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    let query = db("snippets").select("*");

    if (q) {
      query = query
        .where("title", "like", `%${q}%`)
        .orWhere("contents", "like", `%${q}%`);
    }

    const snippets = await query;
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST search snippets with query parameter q or fields in body
router.post("/", async (req, res) => {
  try {
    const { q } = req.query;
    const { fields } = req.body;

    if (q && fields) {
      return res.status(400).json({
        error: "Cannot provide both query parameter 'q' and 'fields' in body",
      });
    }

    let query = db("snippets").select("*");

    if (q) {
      query = query
        .where("title", "like", `%${q}%`)
        .orWhere("contents", "like", `%${q}%`);
    } else if (fields) {

      if (fields.tags) {
        query = query.whereIn(
          "id",
          db("snippet_tags")
            .select("snippet_id")
            .join("tags", "snippet_tags.tag_id", "tags.id")
            .where("tags.name", fields.tags),
        );
      }
      if (fields.title) {
        query = query.where("title", "like", `%${fields.title}%`);
      }
      if (fields.contents) {
        query = query.where("contents", "like", `%${fields.contents}%`);
      }
    }

    const snippets = await query;
    res.json(snippets);
  } catch (err) {
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

export default router;
