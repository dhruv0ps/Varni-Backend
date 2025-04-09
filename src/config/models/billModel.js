const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    billDetails: [
      {
        category: String,
        name: String,
        price: Number,
        items: [
          {
            name: String,
            price: Number,
          },
        ],
        total: Number,
      },
    ],
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitTotalPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", BillSchema);
