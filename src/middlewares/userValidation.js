const { body } = require('express-validator');

const validateRegistration = [
  body('fullName').notEmpty().withMessage('Nama lengkap tidak boleh kosong'),
  body('email')
    .notEmpty()
    .withMessage('Email tidak boleh kosong')
    .isEmail()
    .withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password tidak boleh kosong'),
  body('passwordConfirmation')
    .notEmpty()
    .withMessage('Konfirmasi password tidak boleh kosong')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Konfirmasi password tidak cocok dengan password');
      }
      return true;
    }),
];

const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email tidak boleh kosong')
    .isEmail()
    .withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password tidak boleh kosong'),
];

module.exports = { validateRegistration, validateLogin };
