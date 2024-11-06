const mongoose = require('mongoose');


const testDb = mongoose.createConnection(process.env.DB_CONNECTION_STRING)



const userSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});


const User = testDb.model('User', userSchema);


module.exports = User;
