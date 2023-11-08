const {
  register,
  login,
  viewProfile,
  updateProfile,
} = require("../Controllers/UserController");

const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", viewProfile);
router.get("/:id/update", updateProfile);

module.exports = router;
