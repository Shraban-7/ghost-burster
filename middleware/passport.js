require("dotenv").config();
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const StrategyJwt = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Model = require("../db/models");
const User = Model.User;

// Passport local strategy configuration
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'User does not exist' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return done(null, false, { message: 'Password Incorrect' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Function to generate JWT token







