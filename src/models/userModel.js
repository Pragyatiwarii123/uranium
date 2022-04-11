const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String,
    authorName: String,
    category: String,
    year: Number,
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //books



// String, Number
// Boolean, Object/json, array