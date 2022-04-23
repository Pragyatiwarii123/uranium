const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    mobile: Number,
    emailId: {
        type: String,
        required: true
    },
    password: String,
    gender: String,
    isDeleted: {
        type: Boolean,
        default: false
    }, //default value is false
    posts: {
        type: [],
        default: []
    },
    age: Number
})

module.exports = mongoose.model('MyUser', userSchema)
