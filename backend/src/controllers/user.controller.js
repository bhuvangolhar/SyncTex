const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Organization = require('../models/organization.model');

// Register a User under an existing Organization
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, organizationId } = req.body;

    if (!name || !email || !password || !organizationId) {
      return res.status(400).json({ message: 'Name, email, password, and organizationId are required' });
    }

    // Check if Organization exists
    const orgExists = await Organization.findByPk(organizationId);
    if (!orgExists) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // Check if Email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'EMPLOYEE',
      organizationId,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        organizationId: newUser.organizationId,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find User with Organization included
    const user = await User.findOne({
      where: { email },
      include: [{ model: Organization, attributes: ['id', 'orgName', 'fullName'] }],
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        organizationId: user.organizationId,
      },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.Organization,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Users by Organization ID
exports.getUsersByOrganization = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const users = await User.findAll({
      where: { organizationId },
      attributes: { exclude: ['password'] }, // Don't send back hashed passwords
    });

    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};