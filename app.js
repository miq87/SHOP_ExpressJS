const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

mongoose.connect(
    'mongodb+srv://shop:' + process.env.ATLAS_PW + '@cluster0-ab5ek.gcp.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const productRoutes = require('./api/routes/products');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/products', productRoutes);

module.exports = app;
