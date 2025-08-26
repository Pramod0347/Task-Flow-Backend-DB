const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware.js'); // <-- add this

const {
  createTask,
  getTasks,
  getTasksById,
  updateTask,
  deleteTask
} = require('../controllers/taskController.js');

// Apply protection to every route below this line
router.use(protect); // <-- add this

router.route('/')
  .post(createTask)
  .get(getTasks);

router.route('/:id')
  .get(getTasksById)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
