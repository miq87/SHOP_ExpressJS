const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')

router.get('/', (req, res, next) => {
  Product.find()
  .exec()
  .then(products => {
    res.status(200).send(products)
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.post('/', (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    imgUrl: req.body.imgUrl
  })
  product.save()
  .then(result => {
    res.status(200).json({ msg: 'Dodano nowy produkt' })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
  .exec()
  .then(doc => {
    res.status(200).json(doc)
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
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
      res.status(200).json(doc)
    }
    res.status(200).json({ msg: 'Brak produktu' })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findByIdAndRemove(id)
  .exec()
  .then(doc =>{
    if(doc) {
      res.status(200).json({ msg: 'Usunięto produkt!' })
    }
    res.status(200).json({ msg: 'Nie ma już tego produktu!' })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

module.exports = router;
