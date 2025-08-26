const User = require("../models/User.js");
const { signToken, setAuthCookie, clearAuthCookie } = require("../utils/jwt.js");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({ name, email, password });

    const token = signToken({ id: user._id });
    setAuthCookie(res, token);

    return res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const valid = user && (await user.matchPassword(password));
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = signToken({ id: user._id });
    setAuthCookie(res, token);

    return res.json({
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
};

// Logout
exports.logout = async (_req, res) => {
  clearAuthCookie(res);
  return res.json({ message: "Logged out" });
};

// Me
exports.me = async (req, res) => {
  return res.json({ user: req.user });
};