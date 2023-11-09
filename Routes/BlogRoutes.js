const {
  getAllBlogs,
  createBlog,
  viewBlog,
  updateBlog,
  deleteBlog,
  comment,
  review,
} = require("../Controllers/BlogController.js");
const AuthenticateUser = require("../Utils/Authenticate.js");

const express = require("express");

const router = express.Router();

router.get("/", getAllBlogs);

router.post("/", AuthenticateUser, createBlog);
router.get("/:id", viewBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

router.post("/:id/comment", AuthenticateUser, comment);
router.post("/:id/review", AuthenticateUser, review);

module.exports = router;
