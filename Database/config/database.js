const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const dbURL =
  "mongodb+srv://oserhir:iprktqq3I3Ri5IS3@cluster0.hhy5kle.mongodb.net/BlogApp?retryWrites=true&w=majority";

mongoose
  .connect(dbURL)
  .then(() => {
    /*
    app.listen(port, () => {
      console.log(`Server is running on port ${port} `);
    }); */
    console.log("Connect to MongooDB....");
  })

  .catch((err) => {
    console.log("Could not connect to MongooDB....", err);
  });
