const blog = require("../Models/Blog.schema.js");

let getAllBlogs = async (req, res) => {
  // Pagination
  const page = req.query.page || 1;
  const limit = 3;

  // Sorting
  let sort = req.query.sort || "createdAt";
  sort = req.query.sort ? req.query.sort.split(",") : [sort];
  // sort[0] = sort[0] === "author" ? "author.username" : sort[0];
  let sortOrder = {};
  sortOrder[sort[0]] = sort[1] ? sort[1] : "asc";

  blog
    .find()
    .populate("author", "username")
    .sort(sortOrder)
    .skip((page - 1) * limit)
    .limit(limit)
    .then(data => {
      res.status(200).json({ Message: "Blogs Found", data: data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

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

  blog
    .updateOne({ _id: id }, { $set: { title, content } })
    .then(data => {
      res.status(200).json({ Message: "Blog Updated" });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let deleteBlog = async (req, res) => {
  let { id } = req.params;

  blog
    .findOneAndDelete({ _id: id })
    .then(data => {
      res.status(200).json({ Message: "Blog Deleted" });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

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
