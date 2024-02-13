const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    pizza:{
        type:String,
        required:true
    },
    base: {
        type:String,
        required:true
    },
    cheese:{
        type:String,
        required:true
    },
    sauce: {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    quantity:{
        type: Number,
        required:true,
        default:1
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Cart",cartSchema)