const express = require('express');
const storeHistory = require('../services/firestore');
const { body, validationResult } = require('express-validator');
const historyRoute = express.Router();

historyRoute.post(
  '/',
  [
    body('id').notEmpty().withMessage('ID tidak boleh kosong'),
    body('name').notEmpty().withMessage('Nama tidak boleh kosong'),
    body('description').notEmpty().withMessage('Deskripsi tidak boleh kosong'),
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

    let data = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    };

    await storeHistory(data.id, data);

    res.status(201).json({
      status: 'success',
      message: 'History successfully added',
      data,
    });
  },
);

module.exports = historyRoute;
