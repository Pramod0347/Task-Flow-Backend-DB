const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,                         // JS can't read cookie
  sameSite: "lax",                        // safe default in dev (same-site)
  secure: process.env.NODE_ENV === "production", // only HTTPS in prod
  maxAge: 7 * 24 * 60 * 60 * 1000         // 7 days
};

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const setAuthCookie = (res, token) => {
  res.cookie("token", token, cookieOptions);
};

const clearAuthCookie = (res) => {
  res.clearCookie("token", { ...cookieOptions, maxAge: 0 });
};

module.exports = { signToken, setAuthCookie, clearAuthCookie };