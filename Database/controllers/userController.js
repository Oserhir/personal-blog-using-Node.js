// controller actions
module.exports.signup_get = (req, res) => {
  res.render("user/SignUp");
};

module.exports.login_get = (req, res) => {
  res.render("user/Login");
};

module.exports.signup_post = async (req, res) => {
  res.send("new signup");
};

module.exports.login_post = async (req, res) => {
  res.send("user login");
};
