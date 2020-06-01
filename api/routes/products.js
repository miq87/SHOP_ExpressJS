const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//  route z listą wszystkich produktów
router.get('/', (req, res, next) => {
  Product.find()
  .exec()
  .then(products => {
    res.status(200).send(products)
  })
  .catch(err => {
    res.status(500).json({ blad: err })
  });
});
//route dodający nowy produkt
router.post('/', (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    imgUrl: req.body.imgUrl
  });
  product.save()
  .then(result => {
    res.status(200).json({
      msg: 'Dodano nowy produkt',
      daneProduktu: product
    });
  })
  .catch(err => {
    res.status(500).json({ blad: err })
  });
});
//route pokazujący szczegóły produktu o podanym id
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId; // wyciągnąłem id z parametru
  Product.findById(id)
  .exec()
  .then(doc => {
    res.status(200).json({
      msg: 'Szczegóły produktu o nr ' + id,
      daneProduktu: doc
    });
  })
  .catch(err => {
    res.status(500).json({ blad: err })
  });
});
/////////////////////////////////
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId; // wyciągnąłem id z parametru
  /*const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }*/
  Product.findByIdAndUpdate(id, //updateOps,
    { name: req.body.name, price: req.body.price,
      description: req.body.description, imgUrl: req.body.imgUrl },
    { new: true }
  )
  .exec()
  .then(doc => {
    if(doc) {
      res.status(200).json({
        msg: 'Zmieniono dane produktu nr ' + id,
        noweDane: doc
      });
    }
    res.status(200).json({
      msg: 'Nie ma produktu o nr ' + id,
      noweDane: doc
    });
  })
  .catch(err => {
    res.status(500).json({ blad: err })
  });
});
/////////////////////////////////
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId; // wyciągnąłem id z parametru
  Product.findByIdAndRemove(id)
  .exec()
  .then(doc =>{
    if(doc) {
      res.status(200).json({
        msg: 'Usunięto produkt o nr ' + id
      });
    }
    res.status(200).json({
      msg: 'Nie ma już produktu o nr ' + id
    });
  })
  .catch(err => {
    res.status(500).json({ blad: err })
  });
});

module.exports = router;
