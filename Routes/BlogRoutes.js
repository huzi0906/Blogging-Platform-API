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
const CheckCreator = require("../Utils/CheckCreator.js");

const express = require("express");

const router = express.Router();

router.get("/", getAllBlogs);

router.post("/", AuthenticateUser, createBlog);
router.get("/:id", viewBlog);
router.put("/:id", AuthenticateUser, CheckCreator, updateBlog);
router.delete("/:id", AuthenticateUser, CheckCreator, deleteBlog);

router.post("/:id/comment", AuthenticateUser, comment);
router.post("/:id/review", AuthenticateUser, review);

module.exports = router;
