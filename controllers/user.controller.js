require("dotenv").config();
const Model = require("../db/models");
const User = Model.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userHello = (req, res) => {
  
  res.render("test", {
    user: req.user,
    message: "You have access to the protected route!",
  });
 
};

const userRegisterView = (req, res, next) => {
  res.render("register", {
    title: "User Registration",
  });
};

const userRegister = async (req, res) => {
  const { username, email, password, role } = req.body;

  const userExist = await User.findOne({ where: { email } }).catch((err) => {
    console.log("error " + err);
  });

  if (userExist) {
    return res.json({
      message: "User with this email already exist",
    });
  }

  //   const newUser = new User({ username, email, password, role });
  const salt = await bcrypt.genSalt(10);
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    role: req.body.role,
  };

  const saveUser = await User.create(newUser).catch((err) => {
    console.log("error " + err);
    res.json({
      error: "cannot register user at the moment",
    });
  });

  // console.log(req.body)
  if (saveUser) {
    res.redirect("/users/login");
    // res.json({
    //   message: "user register successfully!",
    // });
  }
};

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const login_view = (req, res) => {
  res.render("login");
};

const userLogin = async (req, res) => {
  // If authentication is successful, generate and set the JWT token in a cookie
  const token = generateToken({
    id: req.user.id,
    email: req.user.email,
    username: req.user.username,
    role: req.user.role,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3600000, // 1 hour
  });


  res.redirect('/users/me');

  // res.status(200).json({ message: "Welcome back!", token });
};

const userLogout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/users/login");
  // res.json({ message: "Logged out successfully" });
};




module.exports = {
  userHello,
  userRegister,
  userLogin,
  userRegisterView,
  login_view,
  userLogout,
};
