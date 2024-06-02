const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../services/userService');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await registerUser(email, password);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: { uid: userRecord.uid },
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: 'fail', message: 'Failed to create user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email } = req.body;
  try {
    const userRecord = await loginUser(email);
    res.json({ status: 'success', message: 'Login successful', data: { uid: userRecord.uid } });
  } catch (error) {
    res.status(401).json({ status: 'fail', message: 'Invalid credentials', error: error.message });
  }
});

router.post('/logout', async (req, res) => {
  try {
    await logoutUser();
    res.json({ status: 'success', message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Failed to logout', error: error.message });
  }
});

module.exports = router;
