const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// Home Page
router.get("/", (req, res) => {
  res.render("Home");
});

//
router.get("/signup", userController.signup_get);
router.post("/signup", userController.signup_post);
router.get("/login", userController.login_get);
router.post("/login", userController.login_post);

module.exports = router;
