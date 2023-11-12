const { disableBlog } = require("../Controllers/AdminController.js");

const AuthenticateUser = require("../Utils/Authenticate.js");
const CheckAdmin = require("../Utils/CheckAdmin.js");

const express = require("express");

const router = express.Router();

router.patch("blogs/:id/disable", AuthenticateUser, CheckAdmin, disableBlog);

module.exports = router;
