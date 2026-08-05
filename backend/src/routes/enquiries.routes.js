const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiries.controller');

// @route   POST /api/enquiries
// @desc    Create a new business enquiry
router.post('/', createEnquiry);

// @route   GET /api/enquiries
// @desc    Get all enquiries (filter by ?status, ?priority, ?search)
router.get('/', getAllEnquiries);

// @route   GET /api/enquiries/:id
// @desc    Get a single enquiry by ID or code
router.get('/:id', getEnquiryById);

// @route   PUT /api/enquiries/:id
// @desc    Update enquiry details, status, or priority
router.put('/:id', updateEnquiry);

// @route   DELETE /api/enquiries/:id
// @desc    Delete an enquiry
router.delete('/:id', deleteEnquiry);

module.exports = router;