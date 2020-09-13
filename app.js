//third party modules
const express = require("express");
const ejs = require("ejs");
const app = express();

//route
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));

//middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));

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
