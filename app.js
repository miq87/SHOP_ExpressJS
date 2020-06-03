const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

mongoose.connect(
    'mongodb+srv://shop:' + process.env.ATLAS_PW + '@cluster0-ab5ek.gcp.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const productRoutes = require('./api/routes/products')
const cartRoutes = require('./api/routes/cart')
const registerRoutes = require('./api/routes/register')
const loginRoutes = require('./api/routes/login')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)

module.exports = app
