const Enquiry = require('../models/enquiries.model');
const { Op } = require('sequelize');

// Create Enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const { clientName, email, priority, status } = req.body;

    if (!clientName) {
      return res.status(400).json({ message: 'Client name is required' });
    }

    const newEnquiry = await Enquiry.create({
      clientName: clientName.trim(),
      email: email ? email.trim() : 'no-email@provided.com',
      priority: priority || 'Medium',
      status: status || 'Fresh',
    });

    return res.status(201).json({
      message: 'Enquiry created successfully',
      data: newEnquiry,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Enquiries (Optional filters via query: /api/enquiries?status=Fresh&priority=High&search=john)
exports.getAllEnquiries = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const whereCondition = {};

    if (status && status !== 'ALL') {
      whereCondition.status = status;
    }

    if (priority && priority !== 'ALL') {
      whereCondition.priority = priority;
    }

    if (search) {
      const searchTerm = search.trim();
      whereCondition[Op.or] = [
        { clientName: { [Op.iLike]: `%${searchTerm}%` } },
        { enquiryCode: { [Op.iLike]: `%${searchTerm}%` } },
        { email: { [Op.iLike]: `%${searchTerm}%` } },
      ];
    }

    const enquiries = await Enquiry.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ data: enquiries });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Single Enquiry by ID or enquiryCode
exports.getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findOne({
      where: {
        [Op.or]: [{ id: isNaN(id) ? null : id }, { enquiryCode: id }],
      },
    });

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    return res.status(200).json({ data: enquiry });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Enquiry
exports.updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, email, priority, status } = req.body;

    const enquiry = await Enquiry.findOne({
      where: {
        [Op.or]: [{ id: isNaN(id) ? null : id }, { enquiryCode: id }],
      },
    });

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    if (clientName !== undefined) enquiry.clientName = clientName.trim();
    if (email !== undefined) enquiry.email = email ? email.trim() : 'no-email@provided.com';
    if (priority !== undefined) enquiry.priority = priority;
    if (status !== undefined) enquiry.status = status;

    await enquiry.save();

    return res.status(200).json({
      message: 'Enquiry updated successfully',
      data: enquiry,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findOne({
      where: {
        [Op.or]: [{ id: isNaN(id) ? null : id }, { enquiryCode: id }],
      },
    });

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    await enquiry.destroy();

    return res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};