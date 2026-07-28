const express = require('express');
const router = express.Router();
const {
  createOrganization,
  getAllOrganizations,
} = require('../controllers/organization.controller');

router.post('/', createOrganization);
router.get('/', getAllOrganizations);

module.exports = router;