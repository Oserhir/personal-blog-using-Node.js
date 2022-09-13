// Require the NPM packages that we need
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database"); // Connect to Database

// Initalise a new express application
const app = express();

// Flash
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

// Static File
app.use(express.static("images"));
app.use(express.static("public"));
app.use("/style", express.static(__dirname + "public/style"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/uploads", express.static(__dirname + "public/uploads"));

// Setting our view engine as EJS
const ejs = require("ejs");
app.set("view engine", "ejs");

// Middleware
// This allows us to pass data from the form
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Configiration -- Set Cookie Parser, sessions and flash
app.use(cookieParser("SecritStringForCookies")); // Create a new cookie parser middleware
app.use(
  session({
    secret: "SecritStringForSession",
    cookie: { maxAge: 60000 }, // A positive value indicates when the cookie should expire relative to the current time
    resave: true, // Forces the session to be saved back to the session store,
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  })
);
app.use(flash());

// Routes
const blogRouter = require("./Router/blog");
app.use("/", blogRouter);

const userRouter = require("./Router/user-route");
app.use("/", userRouter);
// Set a default environment port or cutom port - 3000
const port = process.env.PORT || 3000;
// Start out application
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
