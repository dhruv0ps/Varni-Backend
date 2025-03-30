const mongoose = require("mongoose");

const AccessoriesSchema = new mongoose.Schema({
  modularType: {
    type: Number,
    required: true,
    unique: true,
  },
  subModules: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Accessories", AccessoriesSchema);
