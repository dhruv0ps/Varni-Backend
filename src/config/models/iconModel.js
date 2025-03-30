const mongoose = require("mongoose");

const IconModularSchema = new mongoose.Schema(
  {
    modularType: {
      type: String,
      required: true,
      unique: true,
    },
    subModules: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("IconModular", IconModularSchema);
