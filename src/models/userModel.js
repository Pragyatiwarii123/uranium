const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({ 
    firstName : String,
    lastName : String,
    mobile : Number,
    emailId: String,
    password : String,
    gender : String,
	isDeleted: {
        type:Boolean,
        default:false
    }, //default value is false 
    age: Number})

module.exports = mongoose.model('MyUser', userSchema)
