const User = require("../models/userSchema");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// controller actions
module.exports.signup_get = (req, res) => {
  res.render("user/SignUp", { MESSAGE: req.flash("danger") });
  // res.render("user/SignUp");
};

module.exports.signup_post = (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const { error, value } = schema.validate(req.body);

  // Joi Validation
  if (error) {
    req.flash("danger", error.details[0].message);
    res.redirect("/SignUp");
    //res.status(400).send(error.details[0].message);
  } else {
    // check if user already exists in database
    User.findOne({ email: value.email }).then((result) => {
      if (result) {
        req.flash("danger", "User already exists");
        res.redirect("/SignUp");
        //  res.status(400).send("User already exists");
      }
    });

    const { email, password } = value; // email = value.email
    // The create() function is a thin wrapper around the save() function
    User.create({ email, password })
      .then((user) => {
        const token = createToken(user._id); // send the user Id after create
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // place token inside cookies and send as response
        // res.status(201).send(user);
        res.redirect("/all-posts");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// create json web token
// Signing a token with 3 Days of expiration:
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

module.exports.login_get = (req, res) => {
  res.render("user/Login", { MESSAGE: req.flash("danger") });
};

module.exports.login_post = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  // Joi Validation
  if (error) {
    console.log("error");
    req.flash("danger", error.details[0].message);
    res.redirect("/login");
    //res.status(400).send(error.details[0].message);
  } else {
    // check if user already exists in database
    User.findOne({ email: value.email }).then((user) => {
      if (user) {
        // compare Hash Password
        bcrypt.compare(value.password, user.password).then((validPassword) => {
          if (!validPassword) {
            req.flash(
              "danger",
              "The password that you've entered is incorrect."
            );
            res.redirect("/login");
            // res.status(400).send("Invalid Email Or Password");
          } else {
            // Create Token and send it to the Browser
            const token = createToken(user._id);
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).send({ user: user._id });
          }
        });
      } else {
        req.flash(
          "danger",
          "The email address you entered isn't connected to an account"
        );
        res.redirect("/login");
      }
    });
  }
};

//

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); 
  res.redirect("/");
};

module.exports.logout_post = (req, res) => {};
