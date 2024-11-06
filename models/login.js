const mongoose = require('mongoose');


const loginDb = mongoose.createConnection(process.env.LOGIN_DB_CONNECTION_STRING)
  


const loginSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});


const Login = loginDb.model('Login', loginSchema);


module.exports = Login;
