const user = require("../Models/User.schema");
const jwt = require("jsonwebtoken");

let register = async (req, res) => {
  let { username, email, isAdmin, password } = req.body;
  user
    .create({ username, email, isAdmin, password })
    .then(data => {
      res.status(200).json({ Message: "User Created", data: data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

let login = async (req, res) => {};
let logout = async (req, res) => {};

module.exports = { register, login, logout };
