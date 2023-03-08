const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  joinedOn: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  orders: [],
  address: [],
  password: {
    type: String,
  },
});

module.exports = mongoose.models.users || mongoose.model("users", UserSchema);
