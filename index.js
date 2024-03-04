const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3400
const DB_URL = process.env.DB_URL

const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB database

mongoose.connect(DB_URL).then(()=>{
    console.log("connected to the database")
}).catch((err)=>{
    console.log(err.msg)
})

// Connect the server

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

app.use('/auth',require('./ROUTER/AuthRouter'))
app.use('/',require('./ROUTER/orderRouter'))
app.use('/menu',require('./ROUTER/menuRouter'))
app.use('/cart',require('./ROUTER/cartRouter'))
app.get('/images/:id',(req,res)=>{
    res.sendFile(__dirname +  "/Assets/Images/"+ `${req.params.id}.png`)
})
app.use("/apis",require('./ROUTER/PaymentOrder'));