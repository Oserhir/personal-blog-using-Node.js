const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema

const blogSchema = new Schema({
  title: String,
  content: String,
  image: String,
});

// Create a model based on that schema

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
