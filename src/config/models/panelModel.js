const mongoose = require("mongoose");

const PanelSchema = new mongoose.Schema({
  panel: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  dis_price: { type: Number },
});

module.exports = mongoose.model("Panel", PanelSchema);
