const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Veirfy token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token not valid" });
  }
}

module.exports = auth;
