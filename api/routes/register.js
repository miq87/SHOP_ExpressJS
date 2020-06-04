const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user')

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: 'There is no GET in register!'
  })
})

router.post('/', (req, res, next) => {
    let userData = req.body

    const user = new User(userData)
    user.save()
    .then(result => {
      res.status(200).json({
        msg: 'Dodano nowego usera!',
        data: result
      })
    })
    .catch(err => {
      res.status(500).json({ Error: err })
    })
  })

module.exports = router
