const mongoose = require("mongoose");

const db_dev = process.env.MONGO_URI || "mongodb://localhost:27017/Switch";
mongoose.connect(db_dev);
let db = mongoose.connection;

db.on("error", console.error.bind(console, "[[[Database connection error]]]"));
db.once("open", () => {
  console.log("[[ Database Connected Successfully ]]");
});

module.exports = db;
