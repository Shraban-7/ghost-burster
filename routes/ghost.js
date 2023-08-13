const express = require("express");
const router = express.Router();
const passport = require("passport");
const varifyToken = require("../middleware/varifyToken");
const isAdmin = require("../middleware/isAdmin");

const {
  ghostCreate,
  getAllGhosts,
  getGhostById,
  ghostUpdate,
  ghostDelete,
  ghostCreateView,
  getDetails,
} = require("../controllers/ghost.controller");

router.get("/ok", (req, res) => {
  res.json({
    message: "ok",
  });
});

router.post("/create", varifyToken,isAdmin, ghostCreate);
router.get("/create", varifyToken, isAdmin, ghostCreateView);
router.get("/list", varifyToken, getAllGhosts);
router.get("/edit/:id", varifyToken, isAdmin, getGhostById);
router.get("/details/:id", varifyToken, getDetails);
router.post("/ghost-store/:id", varifyToken, isAdmin, ghostUpdate);
router.get("/delete/:id", varifyToken, isAdmin, ghostDelete);

module.exports = router;
