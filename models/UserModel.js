const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  // condition: {
  //   type: Boolean,
  //   required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

// model name = user, schema
module.exports = User = mongoose.model("user", UserSchema);
