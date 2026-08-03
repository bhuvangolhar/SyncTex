const express = require('express');
const router = express.Router();
const {
  createOrganization,
  getAllOrganizations,
} = require('../controllers/organization.controller');

// @route   POST /api/organizations
// @desc    Create a new organization
router.post('/', createOrganization);

// @route   GET /api/organizations
// @desc    Get all organizations
router.get('/', getAllOrganizations);

module.exports = router;