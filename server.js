const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Load env
dotenv.config();

// Connect to DB
connectDB();

// App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.get('/debug', (req, res) => {
  res.send('Debug route working!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
