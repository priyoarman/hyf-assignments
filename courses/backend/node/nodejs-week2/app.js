import express from "express";
import snippetRouter from "./api/src/routers/snippets.js";
import tagRouter from "./api/src/routers/tags.js";
import searchRouter from "./api/src/routers/search.js";

const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.use("/api/snippets", snippetRouter);
app.use("/api/tags", tagRouter);
app.use("/api/search", searchRouter);

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});