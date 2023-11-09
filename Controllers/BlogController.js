const blog = require("../Models/Blog.schema");

let getAllBlogs = async (req, res) => {};

let createBlog = async (req, res) => {
  let { title, content } = req.body;
  blog
    .create({ title, content, author: req.body.signedInUser.id })
    .then(data => {
      res.status(200).json({ Message: "Blog Created", data: data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let viewBlog = async (req, res) => {};
let updateBlog = async (req, res) => {};
let deleteBlog = async (req, res) => {};

let comment = async (req, res) => {};
let review = async (req, res) => {};

module.exports = {
  getAllBlogs,
  createBlog,
  viewBlog,
  updateBlog,
  deleteBlog,
  comment,
  review,
};
