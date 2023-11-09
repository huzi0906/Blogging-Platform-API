const user = require("../Models/User.schema.js");

let viewProfile = async (req, res) => {
  let { id } = req.params;
  user
    .findById(id)
    .then(data => {
      res.status(200).json({ Message: "User Found", data: data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let updateProfile = async (req, res) => {
  let { id } = req.params;
  if (id === req.body.signedInUser.id) {
    let { username, email, password } = req.body;
    user
      .updateOne({ _id: id }, { $set: { username, email, password } })
      .then(data => {
        res.status(200).json({ Message: "Profile Updated" });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(403).json({ Message: "You Are Not Authorized" });
  }
};

module.exports = { viewProfile, updateProfile };
