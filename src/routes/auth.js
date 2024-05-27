const express = require('express');
const authRoute = express.Router();
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const { storeUser, getUserByEmail } = require('../services/firestore');
const { body, validationResult } = require('express-validator');
const verifyToken = require('../middlewares/verifyToken');

authRoute.post(
  '/register',
  [
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
          throw new Error('Konfirmasi password tidka cocok dengan password');
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 'fail',
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { fullName, email, password } = req.body;

    try {
      const emailTaken = await getUserByEmail(email);
      if (emailTaken) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email sudah digunakan',
        });
      }

      const newUser = {
        fullName,
        email,
        password: bcrypt.hashSync(password, 8),
      };

      await storeUser(newUser);

      res.status(201).json({
        status: 'success',
        message: 'Anda berhasil terdaftar',
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  },
);

authRoute.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Email tidak valid')
      .notEmpty()
      .withMessage('Email tidak boleh kosong'),
    body('password').notEmpty().withMessage('Password tidak boleh kosong'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 'fail',
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          status: 'fail',
          message: 'Email atau password salah',
        });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({
          status: 'fail',
          message: 'Email atau password salah',
        });
      }

      let token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        },
      );

      res.status(200).json({
        status: 'success',
        message: 'Login berhasil',
        token,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  },
);

authRoute.get('/profile', verifyToken, async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Data berhasil diambil',
    data: req.user,
  });
});

module.exports = authRoute;
