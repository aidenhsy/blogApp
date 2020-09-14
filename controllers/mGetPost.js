const Post = require("../models/Post");

module.exports = async (req, res) => {
  let post = await Post.findById(req.params.id).populate("userid");
  res.render("post", { post });
};
