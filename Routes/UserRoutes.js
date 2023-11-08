const { model } = require("mongoose");
const { register, login, logout } = require("../Controllers/UserController");

const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
