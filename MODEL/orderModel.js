const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    items:[{
        productId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Menu',
            required: true
        },
        pizza: {
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true,
            default: 1
        },
        base: {
            type: String,
            required: true
        },
        sauce: {
            type: String,
            required: true
        },
        cheese: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    total:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['received', 'in kitchen', 'sent to delivery', 'delivered'],
        default: 'received'
    }

},{
    timestamps:true
})

module.exports = mongoose.model("Order",orderSchema)