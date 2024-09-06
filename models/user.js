const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/test")

const userSchema = mongoose.Schema({
       name: String,
       price: String,
       image: String
})

module.exports = mongoose.model('user', userSchema)