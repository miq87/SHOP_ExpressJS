const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user')

router.get('/', (req, res, next) => {
  User.find()
  .exec()
  .then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send(err)
  })
  
})

router.post('/', (req, res, next) => {
    let userData = req.body
    const user = new User(userData)
    user.save()
    .then(result => {
      res.status(200).send('Dodano nowego usera!')
    })
    .catch(err => {
      res.status(500).send(err)
    })
  })

module.exports = router
