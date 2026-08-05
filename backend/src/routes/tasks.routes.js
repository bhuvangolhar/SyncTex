const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', createTask);

// @route   GET /api/tasks
// @desc    Get all tasks (or filter by ?userId=1)
router.get('/', getAllTasks);

// @route   GET /api/tasks/:id
// @desc    Get a single task by ID
router.get('/:id', getTaskById);

// @route   PUT /api/tasks/:id
// @desc    Update task details or status
router.put('/:id', updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', deleteTask);

module.exports = router;