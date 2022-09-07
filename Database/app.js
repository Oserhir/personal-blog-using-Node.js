const mongoose = require("mongoose");
const express = require("express");
const app = express();
const BlogClass = require("./models/blogSchema");

// static file
app.use(express.static("public"));
app.use("/style", express.static(__dirname + "public/style"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/uploads", express.static(__dirname + "public/uploads"));

//
const ejs = require("ejs");
app.set("view engine", "ejs");

//
const apiPost = require("./Router/api-posts");
app.use("/api/post", apiPost);

//
app.listen(3000, () => {
  console.log(`Server is running on port 3000 `);
});

/*
const port = 3000;

// connect to Database
const dbURL =
  "mongodb+srv://oserhir:iprktqq3I3Ri5IS3@cluster0.hhy5kle.mongodb.net/BlogApp?retryWrites=true&w=majority";

mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} `);
    });
    // console.log("Connect to MongooDB....");
  })

  .catch((err) => {
    console.log("Could not connect to MongooDB....", err);
  });

/*
// // Mongoos and mongo sandbox routers
app.get("/add-blog", (req, res) => {
  const blog = new BlogClass({
    title: "Nodtrjejs Cotrtrjtrjurse",
    content: "rhrehrhrh",
    image: "images/url.png",
  });

  blog
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}); */
