const Model = require("../db/models");
const Booking = Model.Booking;

// const createBookingView = (req,res)=>{
//   const user=req.user.id;
//   res.render('booking_create',{user:user});
// }

const createBooking = async(req,res)=>{
    try {
    const { checkInDate, checkOutDate, status, userId, ghostId } = req.body;
    
    const newBooking = await Booking.create({
      checkInDate,
      checkOutDate,
      status,
      userId,
      ghostId
    });

    console.log(newBooking);
     res.redirect('/bookings/list');;
    // res.send("Booking successfully!");
  } catch (error) {
    console.error("Error Booking:", error);
    res.status(500).send("Error creating Booking");
  }
}


const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll();
    const user=req.user;
    // console.log(Bookings);

    res.render("booking_list", { bookings: bookings,user:user }); // the parameter passed to the view
    // res.json(Bookings);
  } catch (error) {
    throw new Error("Error retrieving bookings: " + error.message);
  }
};

const getBookingById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  // res.render('test');
  try {
    const booking = await Booking.findByPk(id);
    // res.json(booking);

    res.render("booking_edit", { booking: booking,user:user });
  } catch (error) {
    throw new Error("Error retrieving Booking: " + error.message);
  }
};

const bookingUpdate = async (req, res) => {
  const id = req.params.id;
  const { checkInDate, checkOutDate, status } = req.body;
  try {
    // Find the booking record by primary key (id)
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update the booking record with the new data
    await booking.update({
      checkInDate,
      checkOutDate,
      status
    });

    // Respond with the updated booking record
    // res.json(booking);
    res.redirect("/bookings/list");
  } catch (error) {
    throw new Error("Error updating Booking: " + error.message);
  }
};

module.exports = { createBooking ,getAllBookings,getBookingById,bookingUpdate};
