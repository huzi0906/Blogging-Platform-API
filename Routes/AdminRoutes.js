const {
  getAllUsers,
  getAllBlogs,
  blockUser,
  unBlockUser,
  disableBlog,
  enableBlog,
} = require("../Controllers/AdminController.js");

const express = require("express");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/blogs", getAllBlogs);

router.patch("/users/:id/block", blockUser);
router.patch("/users/:id/unblock", unBlockUser);

router.patch("/blogs/:id/disable", disableBlog);
router.patch("/blogs/:id/enable", enableBlog);

module.exports = router;
