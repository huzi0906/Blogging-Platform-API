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

let follow = async (req, res) => {
  let { id } = req.params;
  let { signedInUser } = req.body;
  if (id === signedInUser.id) {
    res.status(403).json({ Message: "You Cannot Follow Yourself" });
  } else {
    user
      .findOne({ _id: signedInUser.id, following: { $in: [id] } })
      .then(data => {
        if (data) {
          res.status(400).json({ Message: "Already Followed" });
        } else {
          user
            .updateOne(
              { _id: id },
              {
                $push: {
                  followers: signedInUser.id,
                  notifications: `${signedInUser.username} started following you`,
                },
              }
            )
            .then(data => {
              user
                .updateOne(
                  { _id: signedInUser.id },
                  { $push: { following: id } }
                )
                .then(data => {
                  res.status(200).json({ Message: "Followed" });
                })
                .catch(err => {
                  res.status(500).send(err);
                });
            })
            .catch(err => {
              res.status(500).send(err);
            });
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};

let unfollow = async (req, res) => {};

let viewNotifications = async (req, res) => {};

module.exports = {
  viewProfile,
  updateProfile,
  follow,
  unfollow,
  viewNotifications,
};
