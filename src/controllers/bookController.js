const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
const authorModel = require("../models/authorModel")


// const createBook= async function (req, res) {
//     let data= req.body

//     let savedData= await BookModel.create(data)
//     res.send({msg: savedData})
// }

// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }

const createBook= async function (req, res) {
        let data= req.body
    
        let savedData= await BookModel.create(data)
        res.send({msg: savedData})
     }

const getAuthor =  async function (req, res) {
    let doc= req.body
    let savedDoc= await AuthorModel.create(doc)
    res.send({msg: savedDoc})
 }


//  List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- 
//  first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )

 const findId = async function (req, res) {
    let savedId= await AuthorModel.find({ author_name:"Chetan Bhagat"})
    let id =savedId[0].author_id
    let savedBook= await BookModel.find({author_id:id})
    // console.log(savedId[0].author_id);
    res.send({msg: savedBook}) 
 }

// find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.
// ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)


const findBook = async function (req, res) {
    let savedBook1= await BookModel.findOneAndUpdate(
    { name:"Two states"} ,
    { $set :{ price:100}}, 
    {new:true} )
     let id1 = savedBook1.author_id
    let savedId1= await AuthorModel.find({author_id:id1})
    console.log(id1)
    res.send({author: savedId1[0].author_name , price : savedBook1.price }) 
 }

//  Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
// bookModel.find( { price : { $gte: 50}  ,  price: {$lte: 100} } ) // WRONG
// bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})..run a map(or forEach) loop 
// and get all the authorName corresponding to the authorId’s ( by querying authorModel)

const findBookAndPrice = async function(req,res){
   let pt1=await BookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id:1,_id:0})
   const pt2 = pt1.map(inp => inp.author_id)
   let arr=[]
   for(let i=0;i<pt2.length;i++){
      let x= pt2[i]
      const author1 = await authorModel.find({author_id:x}).select({author_name:1,_id:0})
      arr.push(author1)
   }
   const authorN=arr.flat()
   // console.log(pt2)
    res.send({msg: authorN}) 

}




// // CRUD OPERATIONS:
// // CREATE
// // READ
// // UPDATE
// // DELETE



// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks
module.exports.createBook = createBook
module.exports.getAuthor = getAuthor
module.exports.findId = findId
module.exports.findBook = findBook
module.exports.findBookAndPrice = findBookAndPrice


