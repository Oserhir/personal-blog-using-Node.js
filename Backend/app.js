const express = require("express");
const { required } = require("joi");
const app = express();
const Joi = require("joi");

const Post = require("./api/Models/posts");
const postData = new Post();
const multer = require("multer");
//const upload = multer({ dest: "images/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
    // console.log(`${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimetype) => {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
  }
};

const upload = multer({ storage: storage });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/images", express.static("images"));
/*
const Posts = [
  {
    id: 1,
    title: "Why I Love JavaScript",
    content:
      "I know, I know. Naysayers will tell you that if you love Javascript, you are a person with a bad taste. And that you're not one the true programmers.  But I really love this language. There is some cool things and tricks in Javascript that I find very interesting and useful. Maybe, I am a person with a bad taste. Maybe. But that's not the question right now. ",
    post_image: "images/post-image-1581376324096.png",
    added_date: "1581461442206",
  },
  {
    id: 2,
    title: "10 Reason Why We Love Javascript ",
    content:
      "There are so many reasons I love to developing Application using JavaScript. When you write java, you don’t usually just write java. We find the Client/Server Model Everywhere and you don’t want to send the Server code to the Client End,but you can send the Javascript that can be executed on the Client’s Browser.",
    post_image: "images/post-image-1581375207393.jpg",
    added_date: "1581461442206",
  },
  {
    id: 3,
    title: "My love-hate relationship with JavaScript ",
    content:
      "There are three types of programmers, the ones who love JavaScript, the ones who hate JavaScript and the ones who do both. JavaScript is the second language(First was C/C++) I learned when I was trying to run my Wordpress blog. It was even before I started my career. When I started my engineering career I started as a Java Web app developer, which meant I had the chance to work on JavaScript as well for the front-end part. I was pretty good at JS/HTML/CSS and soon I was doing a lot of front-end focused Java Web apps. I also learned JQuery and fell in love with it.",
    post_image: "images/post-image-1581377760883.jpg",
    added_date: "1581461442206",
  },
]; */

const Posts = postData.get();

app.get("/api/posts", (req, res) => {
  // res.status(200).send(Posts);
  res.status(200).send(Posts);
});

app.get("/api/posts/:post_id", (req, res) => {
  // let post = Posts.find((post) => parseInt(req.params.post_id) === post.id);

  let post = Posts.find((post) => req.params.post_id === post.id);
  if (!post) {
    return res.status(404).send("Post Not Found");
  } else {
    res.send(post);
  }
});

app.post("/api/posts/new", upload.single("post_image"), (req, res) => {
  console.log(req.file.path);
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
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
