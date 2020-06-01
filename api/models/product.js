const mongoose = require("mongoose");

mongoose.connect(
    'mongodb+srv://shop:' + process.env.ATLAS_PW + '@cluster0-ab5ek.gcp.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const productSchema = mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    name: String,
    desc: String,
    price: Number,
    imgUrl: String
});

module.exports = mongoose.model('Product', productSchema);