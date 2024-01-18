const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: false, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    date: {type: String, default: Date.now()},
    country: {type: String},
    activated: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', UserSchema)