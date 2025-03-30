const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  material: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  dis_price: { type: Number },
});

module.exports = mongoose.model("Material", MaterialSchema);
