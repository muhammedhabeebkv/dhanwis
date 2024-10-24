const mongoose = require("mongoose");

const user = new mongoose.Schema({
  phone: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  otp: { type: String, required: false },
  verified: { type: Boolean, required: true },
});

module.exports = {
  user: user,
};
