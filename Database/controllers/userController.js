const User = require("../models/userSchema");
const Joi = require("joi");

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("user/SignUp");
};

module.exports.signup_post = (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const { error, value } = schema.validate(req.body);

  // Joi Validation
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const { email, password } = value; // email = value.email
  // The create() function is a thin wrapper around the save() function
  User.create({ email, password })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.login_get = (req, res) => {
  res.render("user/Login");
};

module.exports.login_post = async (req, res) => {
  // res.send("user login");
};
