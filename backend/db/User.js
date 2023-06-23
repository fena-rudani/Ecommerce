const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})
module.exports = mongoose.model('user', UserSchema) 
