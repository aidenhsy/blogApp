//third party modules
const express = require("express");
const ejs = require("ejs");
const app = express();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const expressSession = require("express-session");

//custom modules
const mStorePost = require("./controllers/mStorePost");
const mStoreUser = require("./controllers/mStoreUser");
const mGetPost = require("./controllers/mGetPost");
const mLoginUser = require("./controllers/mLoginUser");
const mLogout = require("./controllers/mLogout");

//custom middlewares
const mdValidate = require("./middlewares/mdValidate");

//route
let PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
global.loggedIn = null;

//middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());
app.use("/posts/store", mdValidate);
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

//db
mongoose.connect(
  "mongodb+srv://aidenhsy:Bob42802@rest.apiyh.mongodb.net/my_database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//page controllers
const pcHome = require("./controllers/pcHome");
const pcCreatePost = require("./controllers/pcCreatePost");
const pcCreateUser = require("./controllers/pcCreateUser");
const pcLogin = require("./controllers/pcLogin");

//posts
app.post("/posts/store", mStorePost);
app.post("/users/store", mStoreUser);
app.post("/users/login", mLoginUser);

//gets
app.get("/", pcHome);
app.get("/posts/create", pcCreatePost);
app.get("/auth/login", pcLogin);
app.get("/auth/create", pcCreateUser);
app.get("/post/:id", mGetPost);
app.get("/auth/logout", mLogout);
app.use((req, res) => {
  res.render("404");
});
