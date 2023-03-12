const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  subTotal: {
    type: Number,
  },
});

module.exports =
  mongoose.models.orders || mongoose.model("orders", OrdersSchema);
