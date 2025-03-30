require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/index"); // Ensure correct import
const server = require("http").Server(app);
const db = require("./config/db");
const init = require("./config/init");

app.use(cors());
app.use(express.json()); 
app.use("/uploads", express.static("uploads"));

app.get("/api/check", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api/", router);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

init();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
