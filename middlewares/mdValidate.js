module.exports = (req, res, next) => {
  if (req.body.title == null || req.body.body == null || req.files == null) {
    res.redirect("/");
  }
  next();
};
