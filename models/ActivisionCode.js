const mongoose = require('mongoose');
const GenerateToken = require('../utils/GenerateToken');

const ActivisionCodeSchema = mongoose.Schema({
    user: {type: String, required: true},
    token: {type: String, unique: true, default: GenerateToken()},
})

module.exports = mongoose.model('ActivisionCode', ActivisionCodeSchema)