const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    game_files: {type: String,},
    cover: {type: String},
    trailer: {type: String},
    desc: {type: String},
    genres: {type: Array},
    date: {type: String, default: Date.now()}
})

module.exports = mongoose.model('Game', GameSchema)