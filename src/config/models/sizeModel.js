const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  dis_price: { type: Number },
});

module.exports = mongoose.model("Size", SizeSchema);
