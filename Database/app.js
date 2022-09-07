const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Blogapp")
  .then(() => {
    console.log("Connect to MongooDB....");
  })

  .catch((err) => {
    console.log("Could not connect to MongooDB....", err);
  });
