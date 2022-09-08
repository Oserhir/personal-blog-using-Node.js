const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema

const blogSchema = new Schema({
  title: String,
  content: String,
  post_image: String,
  added_date: Date,
});

// Create a model based on that schema

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
