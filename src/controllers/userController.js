const UserModel= require("../models/userModel")

const createNewBook= async function (req, res) {
    let data= req.body                                  
    let savedBooks= await UserModel.create(data)
    res.send({msg: savedBooks})
}

const getAllBooks= async function (req, res) {
    let allBooks= await UserModel.find()
    res.send({msg: allBooks})
}

module.exports.createNewBook= createNewBook
module.exports.getAllBooks= getAllBooks