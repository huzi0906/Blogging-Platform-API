const blog = require("../Models/Blog.schema.js");
const user = require("../Models/User.schema.js");

let getAllUsers = async (req, res) => {
  user
    .find()
    .then(data => {
      res.status(200).json({ Message: "Users Found", data: data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let getAllBlogs = async (req, res) => {
  // Pagination
  const page = req.query.page || 1;
  const limit = 10;

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
      data = data.map(doc => {
        const {
          title,
          author: { username: author },
          createdAt,
          averageRating,
        } = doc.toObject({
          virtuals: true,
        });
        return { title, author, createdAt, averageRating };
      });
      res.status(200).json({ Message: "Blogs Found", data: data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let blockUser = async (req, res) => {
  let { id } = req.params;
  user
    .updateOne({ _id: id }, { $set: { blocked: true } })
    .then(data => {
      res.status(200).json({ Message: "User Blocked" });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let unBlockUser = async (req, res) => {
  let { id } = req.params;
  user
    .updateOne({ _id: id }, { $set: { blocked: false } })
    .then(data => {
      res.status(200).json({ Message: "User Unblocked" });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let disableBlog = (req, res) => {};
let enableBlog = (req, res) => {};

module.exports = {
  getAllUsers,
  getAllBlogs,
  blockUser,
  unBlockUser,
  disableBlog,
  enableBlog,
};
