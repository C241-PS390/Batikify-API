const { validationResult } = require('express-validator');
const { registerUser, loginUser, logoutUser } = require('../services/userService');

const registerController = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      status: 'fail',
      message: 'Validation error',
      errors: validationErrors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  const { email, password, fullName } = req.body;
  try {
    const userId = await registerUser(email, password, fullName);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: { userId },
    });
  } catch (error) {
    let errorStatus;
    if (error.message === 'Email sudah digunakan') {
      errorStatus = 409;
    } else {
      errorStatus = 500;
    }

    res.status(errorStatus).json({
      status: 'fail',
      message: 'Failed to create user',
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      status: 'fail',
      message: 'Validation error',
      errors: validationErrors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.json({
      status: 'success',
      message: 'Login successful',
      data: { token },
    });
  } catch (error) {
    let errorStatus;
    if (error.message === 'Email atau password salah') {
      errorStatus = 401;
    } else {
      errorStatus = 500;
    }

    res.status(errorStatus).json({
      status: 'fail',
      message: 'Login failed',
      error: error.message,
    });
  }
};

const profileController = async (req, res) => {
  const userData = req.user;

  res.status(200).json({
    status: 'success',
    message: 'Data berhasil diambil',
    data: {
      fullName: userData.fullName,
      email: userData.email,
    },
  });
};

const logoutController = async (req, res) => {
  try {
    const token = req.headers['authorization'];

    await logoutUser(token);
    res.json({ status: 'success', message: 'Logout successful' });
  } catch (error) {
    let errorStatus;
    if (error.message === 'Tidak ada token') {
      errorStatus = 403;
    } else if (error.message === 'Token invalid') {
      errorStatus = 400;
    } else {
      errorStatus = 500;
    }

    res.status(errorStatus).json({
      status: 'fail',
      message: 'Failed to logout',
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController, profileController, logoutController };
