const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');

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

// Dashboard - Show all projects
router.get('/dashboard', isLoggedIn, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.session.user._id },
        { members: req.session.user._id }
      ]
    }).populate('createdBy', 'name');

    const user = req.session.user;
    res.render('dashboard', { projects, user });
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

// Create Project (admin only)
router.post('/projects', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = new Project({
      name,
      description,
      createdBy: req.session.user._id,
      members: [req.session.user._id]
    });
    await project.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.redirect('/dashboard');
  }
});

// Single Project Page
// Single Project Page
router.get('/projects/:id', isLoggedIn, async (req, res) => {
    try {
      const Task = require('../models/task');
  
      const project = await Project.findById(req.params.id)
        .populate('members', 'name email')
        .populate('createdBy', 'name');
  
      const tasks = await Task.find({ project: req.params.id })
        .populate('assignedTo', 'name');
  
      const users = await User.find({}, 'name email role');
      const user = req.session.user;
      res.render('project', { project, user, users, tasks });
    } catch (err) {
      console.log(err);
      res.redirect('/dashboard');
    }
  });

// Add Member to Project (admin only)
router.post('/projects/:id/members', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { userId } = req.body;
    await Project.findByIdAndUpdate(req.params.id, {
      $addToSet: { members: userId }
    });
    res.redirect(`/projects/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/dashboard');
  }
});

// Delete Project (admin only)
router.delete('/projects/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.redirect('/dashboard');
  }
});

module.exports = router;