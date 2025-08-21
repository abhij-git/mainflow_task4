const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    }

    // success (in production you would issue a session or JWT)
    return res.json({ status: 'success', message: 'Login successful', user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'fail', message: 'Server error' });
  }
});

module.exports = router;
