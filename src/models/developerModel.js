const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const developerSchema = new mongoose.Schema({ 
    name:String,
	gender:{
        type:String,
        enum:["Female","Male","Others"]
    },
	percentage:Number,
    batch:{
         type:ObjectId,
         ref:'newBatch'
        }

    

})


module.exports = mongoose.model('newDeveloper', developerSchema)
