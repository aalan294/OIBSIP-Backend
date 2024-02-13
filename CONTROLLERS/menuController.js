const menuSchema = require('../MODEL/menuModel')

const addMenu = async(req,res)=>{
    try {
        const {pizza, image, price} = req.body
        newMenu = await menuSchema.create({
            pizza,
            image,
            price
        })
        if(!newMenu){
            return res.status(400).json({msg:"menu not added",status:false})
        }
        res.status(200).json({msg:"successfully added",status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}
const getAllMenu = async(req,res)=>{
    try {
        const menu = await menuSchema.find()
        if(!menu){
            return res.status(400).json({msg:"menu not fetched",status:false})
        }
        res.status(200).json({menu,status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

module.exports = {addMenu,getAllMenu}