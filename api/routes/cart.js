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
  const id = req.body.productId
  
  const filter = { "productId": id };
  Cart.findOneAndUpdate(filter, { $inc: { qty: 1 } }, { new: true })
  .exec()
  .then(doc => {
    if(doc) {
      res.status(200).json({ msg: 'Zwiększono ilość produktu o id ' + id, new: doc })
    }
    else {
      if(!req.body.productName) req.body.productName = "Demo Name"
      if(!req.body.price) req.body.price = 0

      const cart = new Cart({
        productId: req.body.productId,
        productName: req.body.productName,
        price: req.body.price,
        qty: 1
      })
      cart.save()
      .then(result => {
        res.status(200).json({ msg: 'Dodano nowy produkt!', new: result })
      })
      .catch(err => {
        res.status(500).json({ Error: err })
      })
    }
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
});

module.exports = router
