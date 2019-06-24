const validatePassword = (req, res, next) => {
  const user = req.body;
  if (user.password.length > 5) {
    next();
  } else {
    res.status(400).json({ error: "Password too short."});
  }
};

module.exports = validatePassword;
