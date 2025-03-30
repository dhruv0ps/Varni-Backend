const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
},
{
  timestamps: true,
});

module.exports = mongoose.model("Size", SizeSchema);
