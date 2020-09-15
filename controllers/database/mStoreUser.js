const User = require("../../models/User");

module.exports = (req, res) => {
  User.create(req.body);
  res.redirect("/");
};
