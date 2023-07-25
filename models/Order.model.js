const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  orderNumber: Number,
  products: [{}],
  date: {
    type: Date,
    default: Date.now,
  },
  comment: String,
  total: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
