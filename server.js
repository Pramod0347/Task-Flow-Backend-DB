const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes.js')
const cookieParser = require("cookie-parser");

// Load env
dotenv.config();

// Connect to DB
connectDB();

// App
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g., http://localhost:5173
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/debug', (req, res) => {
  res.send('Debug route working!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
