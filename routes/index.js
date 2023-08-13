const express = require("express");
const router = express.Router();
const passport = require("passport");
const varifyToken = require("../middleware/varifyToken");
const isAdmin = require("../middleware/isAdmin");

/* GET home page. */
router.get("/", function (req, res, next) {
  const user = req.user;
  res.render("index", { user: user });
});

module.exports = router;
