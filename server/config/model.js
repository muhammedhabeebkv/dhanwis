const mongoose = require("mongoose");
const Schema = require("./schema.js");

module.exports = {
  users: mongoose.model("users", Schema.user),
};
