const User = require("../models/userSchema");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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
  res.render("user/Login");
};

module.exports.login_post = async (req, res) => {
  console.log(req.body);
};
