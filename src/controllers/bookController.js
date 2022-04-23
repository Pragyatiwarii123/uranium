const BookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")
const publisherModel = require("../models/publisherModel")

// ---------------------------------------------------------------------------------------------------------------

const createBook = async function (req, res) {
    let a = req.body

    let authorId = a.author_id
    if (!authorId) return res.send({ msg: "authorId is required" })
    let savedAuthor = await authorModel.findById(authorId)
    if (!savedAuthor) return res.send({ msg: "authorId is invalid" })

    let publisherId = a.publisher_id
    if (!publisherId) return res.send({ msg: "publisherId is required" })
    let savedPublisher = await publisherModel.findById(publisherId)
    if (!savedPublisher) return res.send({ msg: "publisherId is invalid" })

    let savedBook = await BookModel.create(a)
    res.send({ msg: savedBook })
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const getBooksData = async function (req, res) {
    let booksData = await BookModel.findOne().populate("author_id").populate("publisher_id")
    res.send({ msg: booksData })
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const updateBookData = async function (req, res) {
    let findPublisher = await publisherModel.find({name:{$in:["Penguin","HarperCollins"]}}).select({ _id: 1 })
    console.log(findPublisher)
    let updateBooks = await BookModel.updateMany({publisher_id:{$in:findPublisher}},{isHardCover:true},{new: true})
    res.send({ msg: updateBooks })
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


const updatePrice = async function(req,res){
    let authorRating = await authorModel.find({rating:{$gt:3.5}}).select({id:1})
    let updatedPrice = await BookModel.updateMany({author_id:{$in:authorRating}},{$inc:{price:10}},{new:true})
    res.send({msg:updatedPrice})
}

// -----------------------------------------------------------------------------------------------------------------------

module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.updateBookData = updateBookData
module.exports.updatePrice=updatePrice








