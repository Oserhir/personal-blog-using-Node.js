const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./config/database"); // connect to Database

// Static File
app.use(express.static("public"));
app.use("/style", express.static(__dirname + "public/style"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/uploads", express.static(__dirname + "public/uploads"));

// Template Engine
const ejs = require("ejs");
app.set("view engine", "ejs");

// Routes
const blogRouter = require("./Router/blog");
app.use("/", blogRouter);

// Listen on port 3000

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});

/*
// connect to database => /config/database
// Creat Schema => /models/blogSchema
// Create New Post  /seed/post-seed  ( node post-seed.js )
*/
