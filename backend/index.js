const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SyncTex Backend API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});