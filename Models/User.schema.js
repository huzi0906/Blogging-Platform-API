const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true },
    password: { type: String, required: true },
    blocked: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const model = mongoose.model("User", userSchema);
module.exports = model;
