import express from "express";
import snippetRouter from "./api/src/routers/snippets.js";
import tagRouter from "./api/src/routers/tags.js";
import searchRouter from "./api/src/routers/search.js";
import authRouter from "./api/src/routers/auth.js";
import metricsRouter from "./api/src/routers/metrics.js";
import { initDatabase } from "./database.js";

const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.use("/api/snippets", snippetRouter);
app.use("/api/tags", tagRouter);
app.use("/api/search", searchRouter);
app.use("/api/metrics", metricsRouter);
app.use("/", authRouter);

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

await initDatabase();

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
