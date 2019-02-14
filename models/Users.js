//convention of models is that first letter gets capital-Users ...should be User but accidentally put Users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

//
module.exports = User = mongoose.model("users", UserSchema);
