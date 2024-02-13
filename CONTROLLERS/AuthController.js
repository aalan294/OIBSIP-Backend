const userSchema = require('../MODEL/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer');

// REGISTER Function

const register = async(req,res)=>{
    try {
        const {username, email, mobile, password} = req.body
        if(!username || !email || !mobile || !password){
            return res.json({msg: "Please fill out all fields",status:false})
        }
        emailCheck = await userSchema.findOne({email})
        mobileCheck = await userSchema.findOne({mobile})
        if(emailCheck){
            return res.json({msg: "email already registered",status:false})
        }
        if(mobileCheck){
            return res.json({msg: "mobile number already registered",status:false})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await userSchema.create({
            username,
            email,
            mobile,
            password: hashedPassword
        })
        // Mailing OTP Verification
        if(newUser){
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'aalansasonsingarayan@gmail.com',
                  pass: 'opid nkqb fquq bkxr'
                }
              });
              
              const mailOptions = {
                from: 'aalansasonsingarayan@gmail.com',
                to: email,
                subject: 'Verification Code for Pizza Delivery App',
                text: `your OTP for the email verification is ${process.env.OTP}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    res.status(200).json({msg: "OTP sent successfully",status: true})
                }
              })
    
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({msg: error.message,status: false})
    }
}

//OTP VERIFICATION

const  otpVerify=async(req,res)=>{
    try {
        const{email,otp}= req.body
        if(otp == process.env.OTP){
            const user = await userSchema.findOne({email:email})
            await userSchema.findByIdAndUpdate(user._id,{isVerified:true})
            return res.status(200).json({msg:"user verified",status:true})
        }
        else{
            return res.json({msg:"Invalid OTP",status:false})
        }
    } catch (error) {
        res.status(400).json({msg: error.message,status: false})
    }
}
//OTP RERSEND

const resend = async(req,res)=>{
    try {
        const {email} = req.body
        let user =await userSchema.findOne({email:email})
        if(!user){
            return  res.json({msg:'User not found' , status :false})
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'aalansasonsingarayan@gmail.com',
              pass: 'opid nkqb fquq bkxr'
            }
          });
          
          const mailOptions = {
            from: 'aalansasonsingarayan@gmail.com',
            to: email,
            subject: 'Verification Code for Pizza Delivery App',
            text: `your OTP for the email verification is ${process.env.OTP}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                res.status(200).json({msg: "OTP sent successfully",status: true})
            }
          })
    } catch (error) {
        res.status(400).json({msg: error.message,status: false})
    }
}

// LOGIN function

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await userSchema.findOne({email})
        if(!user){
            return res.json({msg:"email not registered" , status : false})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({msg: "invalid password",status:false})
        }
        const token = jwt.sign(
            {"username": user.username},
            process.env.JWT,
            { expiresIn: '1d'}
        )
        const info = {
            id: user._id,
            username:user.username,
            email:user.email,
            mobile: user.mobile,
            isVerified: user.isVerified,
            isAdmin:  user.isAdmin,
            token: token
        }
        res.status(200).json({info,status:true})
    } catch (error) {
        return res.status(400).json({msg: "error accured in logging in",status: false})
    }
}

module.exports = {register,login,otpVerify,resend}