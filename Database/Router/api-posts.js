const express = require("express");
const router = express.Router();

// middleware that is specific to this router

// define the home page route
router.get("/", (req, res) => {
  res.render("Blog/index");
});

module.exports = router;

/*
app.get("/api/posts", (req, res) => {});

app.get("/api/posts/:post_id", (req, res) => {});

app.post("/api/posts/new", (req, res) => {});
*/
