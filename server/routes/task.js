const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Middleware - Check if logged in
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

// Middleware - Check if admin
const isAdmin = (req, res, next) => {
  if (req.session.user.role !== 'admin') return res.redirect('/dashboard');
  next();
};

// Create Task (admin only)
router.post('/tasks', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { title, dueDate, assignedTo, projectId } = req.body;
    const task = new Task({
      title,
      dueDate,
      assignedTo,
      project: projectId
    });
    await task.save();
    res.redirect(`/projects/${projectId}`);
  } catch (err) {
    console.log(err);
    res.redirect('/dashboard');
  }
});

// Update Task Status
router.post('/tasks/:id/status', isLoggedIn, async (req, res) => {
  try {
    const { status, projectId } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { status });
    res.redirect(`/projects/${projectId}`);
  } catch (err) {
    console.log(err);
    res.redirect('/dashboard');
  }
});

// Delete Task (admin only)
router.delete('/tasks/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.redirect(`/projects/${task.project}`);
  } catch (err) {
    console.log(err);
    res.redirect('/dashboard');
  }
});

module.exports = router;