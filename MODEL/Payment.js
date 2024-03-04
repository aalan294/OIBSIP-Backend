const mongoose = require('mongoose');

const Payment = new mongoose.Schema({
 
  razorpay_order_id:{
    type:String,
    required:true
  },
  razorpay_payment_id:{
      type:String,
      required:true
  },
  razorpay_signature:{
    type:String,
    required:true
  }

});

const paymentschema = mongoose.model('paymentschema', Payment);

module.exports = paymentschema;