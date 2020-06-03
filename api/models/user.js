const mongoose = require("mongoose")

mongoose.connect(
    'mongodb+srv://shop:' + process.env.ATLAS_PW + '@cluster0-ab5ek.gcp.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const userSchema = mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    username: String,
    email: String,
    password: String
})

module.exports = mongoose.model('User', userSchema)
