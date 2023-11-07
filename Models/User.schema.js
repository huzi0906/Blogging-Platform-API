const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const model = mongoose.model("User", userSchema);
module.exports = model;
