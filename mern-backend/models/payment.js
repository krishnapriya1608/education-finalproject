const mongoose=require('mongoose')
const { create } = require('./User')
const paymentSchema=new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports=mongoose.model('payment',paymentSchema)