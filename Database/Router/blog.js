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

  // res.render("Blog/createNewPost"); */
});

// Edit Route

router.get("/edit/:post_id", (req, res) => {
  Blogs.findById(req.params.post_id)
    .then((dataByID) => {
      res.render("Blog/Edit", { Content: dataByID });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/edit/:post_id", upload.single("post_image"), (req, res) => {
  const post_id = req.params.post_id;
  Blogs.findByIdAndUpdate(
    post_id,
    {
      title: req.body.title,
      content: req.body.content,
      post_image: `images/${req.file.filename}`,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

module.exports = router;
