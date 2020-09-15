const Post = require("../../models/Post");

module.exports = async (req, res) => {
  let posts = await Post.find({}).populate("userid");
  res.render("index", { posts });
};
