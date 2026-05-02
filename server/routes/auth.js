const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Show Signup Page
router.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

// Handle Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { error: 'User already exists with this email!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.render('signup', { error: 'Something went wrong. Try again!' });
  }
});

// Show Login Page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'No account found with this email!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Wrong password. Try again!' });
    }

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.render('login', { error: 'Something went wrong. Try again!' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;