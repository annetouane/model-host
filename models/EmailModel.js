const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserEmailSchema = Schema({
  email: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserEmail = mongoose.model("userEmail", UserEmailSchema);
