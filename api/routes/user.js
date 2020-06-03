const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user')

router.get('/', (req, res, next) => {
  User.find()
  .exec()
  .then(user => {
    res.status(200).send(user)
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.post('/', (req, res, next) => {
    let userData = req.body

    const user = new User(userData)
    user.save()
    .then(result => {
      res.status(200).json({
        msg: 'Dodano nowego usera!',
        data: product
      })
    })
    .catch(err => {
      res.status(500).json({ blad: err })
    })
  })

module.exports = router
