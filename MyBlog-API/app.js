const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/images", express.static("images"));

const Posts = [
  {
    id: 1,
    title: "This is a 1 Blog Post",
    content: "This is the 1! ",
    post_image: "images/post-image-1581461442199.jpg",
    added_date: "1581461442206",
  },
  {
    id: 2,
    title: "This is a New 2 Post",
    content: "This is the 2! ",
    post_image: "images/post-image-1581461442199.jpg",
    added_date: "1581461442206",
  },
  {
    id: 3,
    title: "This is a 3 Blog Post",
    content: "This is the 3! ",
    post_image: "images/post-image-1581461442199.jpg",
    added_date: "1581461442206",
  },
  {
    id: 4,
    title: "This is a New 4 Post",
    content: "This is the 4! ",
    post_image: "images/post-image-1581461442199.jpg",
    added_date: "1581461442222",
  },
  {
    id: 5,
    title: "My first job as a developer",
    content:
      "In college, I met a friend at a computer club who was showing a really cool application where you can swipe between different types of clothing!\nBeing very intrigued, I asked my friend if there is any way I can help out and join the team! After some thinking, he told me to finish an assignment, and then they will consider me. Over the weekend, I finished the assignment and was right away told I can join the team, though I would be working for free. That was completely fine for me! ",
    post_image: "images/post-image-1581377760883.jpg",
    added_date: "1581377760891",
  },
];

app.get("/api/posts", (req, res) => {
  res.status(200).send(Posts);
});

app.get("/api/posts/:post_id", (req, res) => {
  let post = Posts.find((post) => parseInt(req.params.post_id) === post.id);

  if (!post) {
    return res.status(404).send("Post Not Found");
  } else {
    res.send(post);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
