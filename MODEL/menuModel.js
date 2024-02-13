const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    pizza: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    base: {
        type: String,
        default: null
    },
    sauce: {
        type: String,
        default: null
    },
    cheese: {
        type: String,
        default: null
        
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Menu",menuSchema)