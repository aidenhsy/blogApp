//third party modules
const express = require("express");
const ejs = require("ejs");
const app = express();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

//custom modules
const mStorePost = require("./controllers/mStorePost");
const mStoreUser = require("./controllers/mStoreUser");
const mGetPost = require("./controllers/mGetPost");
const mLoginUser = require("./controllers/mLoginUser");

//custom middlewares
const mdValidate = require("./middlewares/mdValidate");

//route
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));

//middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());
app.use("/posts/store", mdValidate);

//db
mongoose.connect("mongodb://localhost/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//page controllers
const pcHome = require("./controllers/pcHome");
const pcCreatePost = require("./controllers/pcCreatePost");
const pcCreateUser = require("./controllers/pcCreateUser");
const pcLogin = require("./controllers/pcLogin");

//gets
app.get("/", pcHome);
app.get("/posts/create", pcCreatePost);
app.get("/auth/login", pcLogin);
app.get("/auth/create", pcCreateUser);
app.get("/post/:id", mGetPost);

//posts
app.post("/posts/store", mStorePost);
app.post("/users/store", mStoreUser);
app.post("/users/login", mLoginUser);
