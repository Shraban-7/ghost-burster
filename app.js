const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const axios = require("axios");
// const exphbs = require("express-handlebars");
const hbs = require("hbs");
const passport = require("passport");

require("./middleware/passport");
require("./middleware/varifyToken");
require("./db/models/user");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ghostRouter = require("./routes/ghost");
const bookingRouter = require("./routes/booking");

const app = express();

app.use(passport.initialize());

// Register template partials
// Register template partials
const partialsDir = path.join(__dirname, "views/partials"); // Path to your partials directory
hbs.registerPartials(partialsDir);
// app.engine("handlebars", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
// hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ghosts", ghostRouter);
app.use("/bookings", bookingRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
