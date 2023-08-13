const express = require("express");
const router = express.Router();
const passport = require("passport");
const varifyToken = require("../middleware/varifyToken");
const isAdmin = require("../middleware/isAdmin");

const {
  createBooking,
  getAllBookings,
  getBookingById,
  bookingUpdate,
} = require("../controllers/booking.controller");

router.post("/create", varifyToken, createBooking);
router.get("/list", varifyToken, getAllBookings);
router.get("/edit/:id", varifyToken, isAdmin, getBookingById);
router.post("/update/:id", varifyToken, isAdmin, bookingUpdate);

module.exports = router;
