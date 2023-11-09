const blog = require("../Models/Blog.schema.js");

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

let viewBlog = async (req, res) => {
  let { id } = req.params;
  blog
    .findById(id)
    .then(data => {
      res.status(200).json({ Message: "Blog Found", data: data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let updateBlog = async (req, res) => {
  let { id } = req.params;
  let { title, content } = req.body;

  console.log(title, content);

  blog
    .updateOne({ _id: id }, { $set: { title, content } })
    .then(data => {
      res.status(200).json({ Message: "Blog Updated" });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

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
