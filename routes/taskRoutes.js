const express = require('express');
const router =  express.Router();

const {
    createTask,
    getTasks,
    getTasksById,
    updateTask,
    deleteTask
} = require('../controllers/taskController.js');

router.route('/')
    .post(createTask)
    .get(getTasks);

router.route('/:id')
    .get(getTasksById)
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;