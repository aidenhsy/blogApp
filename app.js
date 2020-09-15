//third party modules
const express = require("express");
const ejs = require("ejs");
const app = express();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const expressSession = require("express-session");

//database controllers
const database = require("./controllers/database");
//page controllers
const pages = require("./controllers/pages");
//custom modules //first party modules //these are just controllers //process controller
const mLogout = require("./controllers/mLogout");

//custom middlewares
const mdValidate = require("./middlewares/mdValidate");

//route
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

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

//posts
app.post("/posts/store", database.storePost);
app.post("/users/store", database.storeUser);
app.post("/users/login", database.loginUser);

//gets
app.get("/", pages.home);
app.get("/posts/create", pages.createPost);
app.get("/auth/login", pages.login);
app.get("/auth/create", pages.createUser);
app.get("/post/:id", database.getPost);
app.get("/auth/logout", mLogout);
app.use((req, res) => {
  res.render("404");
});
