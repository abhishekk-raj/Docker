const { MongoClient } = require("mongodb");

const url = "mongodb://mongodb:27017/nest-course";
// const url = "mongodb://localhost:27017/nest-course";

let conn;
const db = async () => {
  try {
    conn = await MongoClient.connect(url);
  } catch (e) {
    console.error(e);
  }

  return conn.db("nest-course");
};

module.exports = db;
