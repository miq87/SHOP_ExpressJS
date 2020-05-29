const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');

const Cart = require('../models/cart');

router.get('/', (req, res, next) => {
  Cart.find()
  .exec()
  .then(cart => {
    res.status(200).send(cart)
  })
  .catch(err => {
    res.status(500).json({ blad:err })
  });
});

module.exports = router;