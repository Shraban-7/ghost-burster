const express = require("express");
const router = express.Router();
const passport = require("passport");
const varifyToken = require('../middleware/varifyToken');
const isAdmin = require("../middleware/isAdmin");

const {
  userHello,
  userRegister,
  userLogin,
  userRegisterView,
  login_view,
  userLogout
} = require("../controllers/user.controller");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/me", varifyToken, isAdmin, userHello);

router.get('/register',userRegisterView);
router.post("/register", userRegister);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userLogin
);
router.get("/login", login_view);

router.get("/logout", varifyToken,userLogout);

module.exports = router;
