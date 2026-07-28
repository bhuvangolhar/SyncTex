const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/db');

// Import Models
const Organization = require('./models/organization.model');

// Import Routes
const organizationRoutes = require('./routes/organization.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/organizations', organizationRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SyncTex Backend API is running' });
});

// Connect DB & Sync
connectDB().then(async () => {
  await sequelize.sync({ alter: true });
  console.log('Database synchronized with Organization model.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});