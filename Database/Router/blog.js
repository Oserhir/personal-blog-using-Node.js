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

// Get Single Post
router.get("/post/:post_id", (req, res) => {
  Blogs.findById(req.params.post_id)
    .then((dataByID) => {
      res.render("Blog/post", { Content: dataByID });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Save Data to MongoDB */
/** GET /  Create Page */
router.get("/create", (req, res) => {
  // Set a flash name and pass it to the home page.
  // If empty, we won't display. That's handled by EJS.

  res.render("Blog/createNewPost", { MESSAGE: req.flash("danger") });
});
/** Post /  Create Page */
router.post("/create", upload.single("post_image"), (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error || req.file == null) {
    req.flash(
      "danger",
      "One or more fields have an error. please check and try again"
    );
    res.redirect("/create");
    //res.render("Blog/createNewPost", { errors: false });
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

/* EDIT */
// EDIT USER POST ACTION
router.post("/edit/:id", upload.single("post_image"), (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error || req.file == null) {
    req.flash(
      "danger",
      "One or more fields have an error. please check and try again"
    );
    res.redirect(`/edit/${req.params.id}`);
  } else {
    const blog = new Blogs({
      _id: req.params.id,
      title: value.title,
      content: value.content,
      post_image: `images/${req.file.filename}`,
    });

    Blogs.updateOne({ _id: req.params.id }, blog)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

/// SHOW EDIT USER FORM
router.get("/edit/:id", (req, res) => {
  const Id = req.params.id;
  Blogs.findById(Id)
    .then((dataByID) => {
      res.render("Blog/Edit", {
        Content: dataByID,
        MESSAGE: req.flash("danger"),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
