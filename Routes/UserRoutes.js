const {
  viewProfile,
  updateProfile,
} = require("../Controllers/UserController.js");
const AuthenticateUser = require("../Utils/Authenticate.js");

const express = require("express");

const router = express.Router();

router.get("/:id", viewProfile);
router.put("/:id", AuthenticateUser, updateProfile);

module.exports = router;
