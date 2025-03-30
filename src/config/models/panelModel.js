const mongoose = require("mongoose");

const PanelSchema = new mongoose.Schema(
  {
    panel: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Panel", PanelSchema);
