const {
  register,
  login,
  viewProfile,
  updateProfile,
} = require("../Controllers/UserController");
const AuthenticateUser = require("../Utils/Authenticate");

const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/:id", viewProfile);
router.put("/:id", AuthenticateUser, updateProfile);

module.exports = router;
