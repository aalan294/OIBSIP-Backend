const cartSchema = require('../MODEL/cartModel')

const addCart = async(req,res)=>{
    try {
      const  {userId, productId, pizza, base, cheese, sauce, image, price, quantity} = req.body
      if(!userId || !productId || !pizza || !cheese || !base || !sauce || !image || !price || !quantity){
        return res.json({msg:"fields missing",status:false})
      }
      const data = await cartSchema.create(req.body)
      res.json({data, msg:'added to the cart', status : true })
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

const getAllCart = async(req,res)=>{
  try {
    const {id} = req.params
    if(!id){
      return res.json({msg:"fields missing",status:false})
    }
    const data = await cartSchema.find({userId:id})
    res.status(200).json({data,msg:"cart details fetched successfully",status:true})
  } catch (error) {
    res.status(400).json({msg:error.message,status:false})
  }
}

const delCart = async(req,res)=>{
  try {
    const {id} = req.params
    if(!id){
      return res.json({msg:"fields missing",status:false})
    }
    await cartSchema.findByIdAndDelete(id)
    res.status(200).json({msg:"item deleted successfully",status:true})
  } catch (error) {
    res.status(400).json({msg:error.message,status:false})
  }
}

module.exports = {addCart,getAllCart,delCart}