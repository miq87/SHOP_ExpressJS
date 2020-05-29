const mongoose = require("mongoose");

mongoose.connect(
    'mongodb+srv://shop:' + process.env.ATLAS_PW + '@cluster0-ab5ek.gcp.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const cartSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    productId: Number,
    productName: String,
    price: Number,
    qty: Number
});

module.exports = mongoose.model('Cart', cartSchema);