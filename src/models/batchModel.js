const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const batchSchema = new mongoose.Schema( {
    name: String,
    size: Number,
    program: {
        type:String,
        enum:["Backend","Frontend"]
    }

    
})

module.exports = mongoose.model('newBatch', batchSchema)