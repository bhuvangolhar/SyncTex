const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('../config/db');

// Import Models to initialize associations
require('./models/organization.model');
require('./models/user.model');
require('./models/tasks.model');
require('./models/enquiries.model');

// Import Routes
const organizationRoutes = require('./routes/organization.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/tasks.routes');
const enquiryRoutes = require('./routes/enquiries.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/organizations', organizationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SyncTex Backend API is running' });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server safely without sequelize.sync()
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();