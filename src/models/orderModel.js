const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const today=moment()
const orderSchema = new mongoose.Schema({
    userId: {
        type:ObjectId,
        ref:"newUser"
    },
	productId: {
        type:ObjectId,
        ref:"Product"
    },
	amount: Number,
    isFreeAppUser: Boolean,
	date:{
        type : String, default: today.format("DD-MM-YYYY")
    }
   
});

module.exports = mongoose.model('Order', orderSchema) 
