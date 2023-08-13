require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = payload;
    next();
  });
};

module.exports = authenticateUser;
