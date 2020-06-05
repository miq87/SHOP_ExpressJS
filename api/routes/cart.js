const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Cart = require('../models/cart')

router.get('/', (req, res, next) => {
  Cart.find()
  .exec()
  .then(cart => {
    res.status(200).send(cart)
  })
  .catch(err => {
    res.status(500).json({ blad:err })
  })
})

router.post('/', (req, res, next) => {
  const id = req.body._id
  
  Cart.findByIdAndUpdate(id, { $inc: { qty: 1 } }, { new: true })
  .exec()
  .then(doc => {
    if(doc) {
      res.status(200).json({ msg: 'Zwiększono ilość produktu o id ' + id, new: doc })
    }
    const cart = new Cart({
      _id: id,
      name: req.body.name,
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
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.patch('/:action', (req, res, next) => {
  const id = req.body._id
  const action = req.params.action

  console.log(req.param.action)

  if(action === "inc") {
    Cart.findByIdAndUpdate(id, { $inc: { qty: 1 } }, { new: true })
    .exec()
    .then(doc => {
      if(doc) {
        res.status(200).json({
          msg: 'Increase ' + id,
          data: doc
        })
      }
      res.status(200).json({
        msg: 'Nie ma produktu o nr ' + id,
        data: doc
      })
    })
    .catch(err => {
      res.status(500).json({ blad: err })
    })
  }
  else if(action === "dec") {
    Cart.findByIdAndUpdate(id, { $inc: { qty: -1 } }, { new: true })
    .exec()
    .then(doc => {
      if(doc) {
        res.status(200).json({
          msg: 'Decrease ' + id,
          data: doc
        })
      }
      res.status(200).json({
        msg: 'Nie ma produktu o nr ' + id,
        data: doc
      })
    })
    .catch(err => {
      res.status(500).json({ blad: err })
    })
  }
})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Cart.findByIdAndRemove(id)
  .exec()
  .then(doc =>{
    if(doc) {
      res.status(200).json({ msg: 'Usunięto produkt z koszyka o id ' + id })
    }
    res.status(200).json({ msg: 'Nie ma już produktu w koszyku o id ' + id })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
})
})

module.exports = router
