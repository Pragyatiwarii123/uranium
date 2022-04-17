const AuthorModel = require("../models/authorModel")
const PublisherModel = require("../models/publisherModel")
const BookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")
const publisherModel = require("../models/publisherModel")

// const createBook= async function (req, res) {
//     let book = req.body                                                      
// const document = await User.findById(id);
//     let bookCreated = await BookModel.create(book)
//     res.send({data: bookCreated})
// }

// const getBooksData= async function (req, res) {
//     let books = await bookModel.find()
//     res.send({data: books})
// }

// const createBook = async function (req, res) {
//     let book = req.body
//     let data
//     let author1 = await authorModel.find()
//     let specificBook1 = await BookModel.create(book)
//     if (book.author) {
// for (let i = 0; i < author1.length; i++) {
//             if (book.author == author1[i]._id) {
//                 data= specificBook1
//                 break


//             }
//             else {
//                 // res.send({ msg: "invalid author Id" })
//                  data=  "invalid author Id"
//             }
//         }
//         res.send({msg: data})

//     }
//     else {
//         res.send({ msg: "author Id required" })
//     }

//     let publisher1 = await publisherModel.find()
//     let specificBook2 = await BookModel.create(book)
//     if (book.publisher) {
//         for (let i = 0; i < publisher1.length; i++) {
//             if (book.publisher == publisher1[i]._id) {
//                 res.send({ data: specificBook2 })

//             }
//             else {
//                 res.send({ msg: "invalid publisher Id" })
//             }
//         }

//     }
//     else {
//         res.send({ msg: "publisher Id required" })
//     }
//}


const createBook = async function (req, res) {
    let  a= req.body
    let specificBook = await BookModel.create(a)
    let author1 = await authorModel.findById(a.author_id)
    let publisher1 = await publisherModel.findById(a.publisher_id)

    if (a.author_id && a.publisher_id) {
        if (author1 != null && publisher1 != null) {
            res.send({ msg: specificBook })
        }
        else if (author1 == null && publisher1!= null) {
            res.send({ msg: "Please provide correct author id " })
        }
        else if (author1!= null && publisher1 == null) {
            res.send({ msg: "Please provide correct publisher id" })
        }
        else {
            res.send({ msg: "Please provide correct author id and publisher id" })
        }
    }
    else if (a.publisher_id) {
        res.send({ msg: "please provide author_id" })
    }
    else if (a.author_id) {
        res.send({ msg: "please provide publisher_id" })
    }
    else {
        res.send({ msg: "Please provide both author_id and publisher_id" })
    }

}


const getBooksData= async function (req, res) {
         let books = await BookModel.find().populate("author_id").populate("publisher_id") // .populate([{path:},{path:}])
         res.send({data: books})
     }

     const updateBookData= async function (req, res) {
        let book = await BookModel.find().updateMany(
          { publisher_id:["6258847c07474c192fdc849b","625b9c561e2fcbcc1099a1e1"]},
            {isHardCover:true}
        )

        res.send({data: book})
    }

    const updateBookData1= async function (req, res) {
        let author=await authorModel.find()    
        let array=[]
        for(let i=0;i<author.length;i++)
        {
            if(author[i].rating>3.5)
            {
                array.push(author[i]._id)
            }
        }
        let data = await BookModel.find().updateMany(
            {author_id:array},                           
            {$inc:{price:10}}
        )
        
            res.send({msg:data})
    }
    


    



    module.exports.createBook = createBook
    module.exports.getBooksData=getBooksData
    module.exports.updateBookData=updateBookData
    module.exports.updateBookData1=updateBookData1








