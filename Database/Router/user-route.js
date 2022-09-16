const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

// Home Page
/*
router.get("/", requireAuth, (req, res) => {
  res.render("Home");
}); */

router.get("/topbar", (req, res) => {
  res.render("user/partials/topbar");
});

//
router.get("/signup", userController.signup_get);
router.post("/signup", userController.signup_post);
router.get("/login", userController.login_get);
router.post("/login", userController.login_post);

router.get("/logout", userController.logout_get);

module.exports = router;
