const express = require("express");
const router = express.Router();
const Blogs = require("../models/blogSchema");
const BlogClass = require("../models/blogSchema");
const Joi = require("joi");

// Get All Post
router.get("/", (req, res) => {
  Blogs.find()
    .then((allData) => {
      res.render("Blog/index", { Blogs: allData });
      //  console.log(allData); // Get all Data inside MongoDB
    })
    .catch((err) => {
      console.log(err);
    });
});

// Show Single Post
router.get("/post/:post_id", (req, res) => {
  Blogs.findById(req.params.post_id)
    .then((dataByID) => {
      // res.send(allData);
      res.render("Blog/post", { Content: dataByID });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Save Data to MongoDB */
router.get("/create", (req, res) => {
  res.render("Blog/createNewPost", { errors: false });
});

router.post("/create", (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(10).required(),
    content: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.render("Blog/createNewPost", { errors: error });

    //  res.status(400).send(error.details[0].message);
  } else {
    const blog = new BlogClass({
      title: value.title,
      content: value.content,
      post_image: "images/post-image-1581376324096.png",
      added_date: `${Date.now()}`,
    });

    blog
      .save()
      .then((result) => res.redirect("/"))
      .catch((err) => console.log(err));
  }

  // res.render("Blog/createNewPost");
});

module.exports = router;

/*
app.post("/api/posts/new", upload.single("post_image"), (req, res) => {

 const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } 

  const post = {
    id: `${Date.now()}`,
    title: value.title,
    content: value.content,
    post_image: req.file.path,
    added_date: `${Date.now()}`,
  };

  postData.add(post);
  res.status(201).send(post);
}); */

/*
app.get("/api/posts", (req, res) => {});

app.get("/api/posts/:post_id", (req, res) => {});

app.post("/api/posts/new", (req, res) => {});
*/
