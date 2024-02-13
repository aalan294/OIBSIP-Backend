const orderSchema = require('../MODEL/orderModel')
const userSchema = require('../MODEL/userModel')
const cartSchema = require('../MODEL/cartModel')
const { response } = require('express')

const newOrder = async(req,res)=>{
    try {
        const {userId,items,total} = req.body
        if(!userId || !items) return res.status(400).json({msg:'missing filelds',status:false})
        const newOrder = await orderSchema.create({
            userId,
            items,
            total
        })
        if(!newOrder){
            return res.json({msg:"order not placed",status: false})
        }

        await userSchema.findOneAndUpdate(
            { _id: userId }, 
            { $push: { orders: newOrder } }, 
            { new: true }
        )
        const data = await cartSchema.deleteMany({userId:userId})
        if(!newOrder){
            return res.json({msg:"cart not emptied",status: false})
        }
        res.status(201).json({msg:"order placed successfully" , status : true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}
const getAllOrders = async(req,res)=>{
    try {
        const orders = await orderSchema.find().sort({ updatedAt: -1 })
        if(!orders){
            return res.status(400).json({msg:"error in fetching orders",status:false})
        }
        res.status(200).json({orders,msg:"orders fetched successfully",status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

const getSingle = async(req,res)=>{
    try {
        const {id} = req.params
        const orders = await orderSchema.findById(id);
        if(!orders){
            return res.json({msg:"no orders found in this id",status:false})
        }
        res.status(200).json({orders,msg:"user's orders fetched successfully",status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

const getOrders = async(req,res)=>{
    try {
        const {id} = req.params
        const orders = await orderSchema.find({ userId: id, status: 'delivered' }).sort({ updatedAt: -1 }).exec();
        if(!orders){
            return res.json({msg:"no orders found in this id",status:false})
        }
        res.status(200).json({orders,msg:"user's orders fetched successfully",status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}
const getRecieved = async(req,res)=>{
    try {
        const orders = await orderSchema.find({status: 'received' }).sort({ updatedAt: -1 }).exec();
        if(!orders){
            return res.json({msg:"no orders found in this id",status:false})
        }
        res.status(200).json({orders,msg:"user's orders fetched successfully",status:true})
    } catch (error) {
        res.json({msg:error.message,status:false})
    }
}
const getKitchen = async(req,res)=>{
    try {
        const orders = await orderSchema.find({status: 'in kitchen' }).sort({ updatedAt: -1 }).exec();
        if(!orders){
            return res.json({msg:"no orders found in this id",status:false})
        }
        res.status(200).json({orders,msg:"user's orders fetched successfully",status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}
const getDelivery = async(req,res)=>{
    try {
        const orders = await orderSchema.find({status: 'sent to delivery' }).sort({ updatedAt: -1 }).exec();
        if(!orders){
            return res.json({msg:"no orders found in this id",status:false})
        }
        res.status(200).json({orders,msg:"user's orders fetched successfully",status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

const updateStatus = async(req,res)=>{
    try {
        const {status,id} = req.body
        const updated = await orderSchema.findByIdAndUpdate(id,{status:status})
        if(!updated){
            return response.json({msg:"can't update status",status:false})
        }
        res.status(200).json({msg:"successfully updated",status:true})
    } catch (error) {
        res.json({msg:error.message,status:false})
    }
}

const pendingOrders = async(req,res)=>{
    const userId = req.params.id;

    try {
      const orders = await orderSchema.find({ userId: userId, status: { $ne: 'delivered' } }).sort({ updatedAt: -1 }).exec()
      if(!orders){
        return res.json({msg:"no orders found in this id",status:false})
    }
      res.status(200).json({orders,msg:"user's orders fetched successfully",status:true})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

module.exports = {newOrder,getAllOrders,getOrders,updateStatus,pendingOrders,getRecieved,getKitchen,getDelivery,getSingle}