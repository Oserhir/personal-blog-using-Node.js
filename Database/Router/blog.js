const express = require("express");
const router = express.Router();
const Blogs = require("../models/blogSchema");
const BlogClass = require("../models/blogSchema");
const Joi = require("joi");

const multer = require("multer");

//Configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const upload = multer({ storage: storage });

const getExt = (mimetype) => {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
  }
};

// Get All Post
router.get("/", (req, res) => {
  Blogs.find()
    .sort({ added_date: -1 })
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

router.post("/create", upload.single("post_image"), (req, res) => {
  // public\images\post_image-1662683835098.png
  const schema = Joi.object({
    title: Joi.string().required(),
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
      post_image: `images/${req.file.filename}`,
      added_date: `${Date.now()}`,
    });

    blog
      .save()
      .then((result) => res.redirect("/"))
      .catch((err) => console.log(err));
  }
});

/// Delete Post

router.delete("/blogs/:id", (req, res) => {
  Blogs.findByIdAndDelete(req.params.id)
    .then((params) => {
      res.json({ mylink: "/" });
    })

    .catch((err) => {
      console.log(err);
    });
});

/*
router.put("/edit/:id", (req, res) => {
  // crete obj
  const blog = new Blogs({
    _id: req.body.id,
    title: req.body.title,
    body: req.body.body,
  });

  blog
    .updateOne({ _id: req.body.id }, blog)
    .then((result) => {
      console.log("update Succesfuly");
    })
    .catch((err) => {
      console.log(err);
    });
});
*/
/* EDIT */
// EDIT USER POST ACTION
router.post("/edit/:id", (req, res) => {
  const blog = new Blogs({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });

  Blogs.updateOne({ _id: req.params.id }, blog)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

/// SHOW EDIT USER FORM
router.get("/edit/:id", (req, res) => {
  const Id = req.params.id;
  Blogs.findById(Id)
    .then((dataByID) => {
      res.render("Blog/Edit", { Content: dataByID });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
