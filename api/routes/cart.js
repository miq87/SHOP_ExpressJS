const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

router.post('/', (req, res, next) => {
  const cart = new Cart({
    _id: mongoose.Types.ObjectId(),
    productId: req.body.productId,
    productName: req.body.productName,
    price: req.body.price,
    qty: 1
  });
  cart.save()
  .then(result => {
    res.status(200).json({
      msg: 'Dodano nowy produkt',
      Koszyk: cart
    });
  })
  .catch(err => {
    res.status(500).json({ 
      Koszyk: cart,
      blad: err
    })
  });
});


module.exports = router;