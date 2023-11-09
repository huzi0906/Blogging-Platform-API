const jwt = require("jsonwebtoken");

let AuthenticateUser = async (req, res, next) => {
  let token = req.headers.token;

  try {
    let { password, ...user } = await jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      req.body.signedInUser = user;
      next();
    } else {
      res.status(404).json({ Message: "Your Are Not Authenticated" });
    }
  } catch (err) {
    res.status(404).json({ Message: "Your Are Not Authenticated", err });
  }
};

module.exports = AuthenticateUser;
