function isAdmin(req, res, next) {
  if (req.user.email === "admin@admin.com") {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Access forbidden. Admin privileges required." });
  }
}

module.exports = isAdmin;
