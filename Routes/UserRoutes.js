const { register, login } = require("../Controllers/UserController");

const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
