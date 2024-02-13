const mongoose = require('mongoose')
const orderSchema = require('../MODEL/orderModel')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    mobile:{
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default: false,
        required: true
    },
    isVerified:{
        type:Boolean,
        default: false,
        required: true
    },
    orders: [],
    default : []
})

module.exports = mongoose.model("User",userSchema)