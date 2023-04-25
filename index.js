const express = require("express");
const app = express();
const db = require("./db");
const port = 3000;

app.get("/", async (req, res) => {
  const database = await db();
  let collection = database.collection("coffees");
  let results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
