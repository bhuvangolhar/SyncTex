const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsersByOrganization,
} = require('../controllers/user.controller');

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
router.post('/login', loginUser);

// @route   GET /api/users/organization/:organizationId
// @desc    Get all users belonging to a specific organization
router.get('/organization/:organizationId', getUsersByOrganization);

module.exports = router;