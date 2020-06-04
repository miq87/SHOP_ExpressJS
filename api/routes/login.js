const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user')

router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'There is no GET in login'
    })
})

router.post('/', (req, res, next) => {
    let userData = req.body
    console.log(userData)

    User.findOne({ email: userData.email })
    .exec()
    .then(user => {
        if(!user) {
            res.status(401).json({
                msg: 'Invalid user!',
            })
        }
        else if (user.password !== userData.password) {
            res.status(401).json({
                msg: 'Invalid password!',
            })
        }
        else {
            res.status(200).json({
                user
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ Error: err })
    })
    
  })

module.exports = router
