const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsersByOrganization,
} = require('../controllers/user.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/organization/:organizationId', getUsersByOrganization);

module.exports = router;