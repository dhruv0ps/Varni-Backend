const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    discount: { type: Number, required: true },
    isAdmin: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
