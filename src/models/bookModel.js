const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

// const bookSchema = new mongoose.Schema( {
//     name: String,
//     author_id: {
//         type: ObjectId,
//         ref: "Author"
//     },
//     price: Number,
//     ratings: Number
// }, { timestamps: true });

const bookSchema = new mongoose.Schema({ 
	    name:String,
		author_id:{
            type:ObjectId,
            ref:'newAuthor'
        },
	    price:Number,
		ratings:Number,
        isHardCover:{
            type:Boolean,
            default:false
        },
		publisher_id:{
            type:ObjectId,
            ref:'newPublisher'
        }

    })


module.exports = mongoose.model('newBook', bookSchema)
