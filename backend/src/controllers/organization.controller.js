const Organization = require('../models/organization.model');

// Create a new Organization
exports.createOrganization = async (req, res) => {
  try {
    const { fullName, orgName } = req.body;

    if (!fullName || !orgName) {
      return res.status(400).json({ message: 'fullName and orgName are required' });
    }

    const existingOrg = await Organization.findOne({ where: { orgName } });
    if (existingOrg) {
      return res.status(400).json({ message: 'Organization name already exists' });
    }

    const newOrg = await Organization.create({ fullName, orgName });
    return res.status(201).json({ message: 'Organization created successfully', data: newOrg });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all Organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.findAll();
    return res.status(200).json({ data: orgs });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};