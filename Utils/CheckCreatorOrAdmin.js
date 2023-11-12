const blog = require("../Models/Blog.schema.js");
const user = require("../Models/User.schema.js");

let CheckCreatorOrAdmin = async (req, res, next) => {
  let { id } = req.params;

  let isAdmin;

  user.findById(req.body.signedInUser.id).then(data => {
    isAdmin = data.isAdmin === true ? true : false;
  });

  blog
    .findById(id)
    .then(data => {
      isAdmin || data.author.toString() === req.body.signedInUser.id
        ? next()
        : res.status(403).json({ Message: "You Are Not Authorized" });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = CheckCreatorOrAdmin;
