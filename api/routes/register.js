const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.get('/', (req, res, next) => {
  User.find()
  .exec()
  .then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).json( { Error: err })
  })
})

router.post('/', (req, res, next) => {
  let userData = req.body
  const user = new User(userData)
  user.save()
  .then(doc => {
    let payload = { subject: doc._id }
    let token = jwt.sign(payload, 'secretKey')
    res.status(200).json({token})
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.delete('/', (req, res, next) => {  
  User.remove()
  .then(() => {
    res.status(200).json({ msg: 'Usunąłem wszystko!' })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

module.exports = router
