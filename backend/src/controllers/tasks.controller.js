const Task = require('../models/tasks.model');
const User = require('../models/user.model');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: 'Title and userId are required' });
    }

    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : null,
      status: status || 'PENDING',
      userId,
    });

    return res.status(201).json({
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Tasks (Optional filter by userId via query: /api/tasks?userId=1)
exports.getAllTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    const whereCondition = userId ? { userId } : {};

    const tasks = await Task.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ data: tasks });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Single Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ data: task });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description ? description.trim() : null;
    if (status !== undefined) task.status = status;

    await task.save();

    return res.status(200).json({
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};