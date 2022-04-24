const batchModel = require("../models/batchModel")
const developerModel = require("../models/developerModel")

const createDeveloper = async function (req, res) {
    let develop = req.body
    let developerCreated = await developerModel.create(develop)
    res.send({ data: developerCreated })
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const scholarshipDeveloper = async function(req,res){
    let scholar =await developerModel.find({gender:"Female",percentage:{$gte:70}})
    console.log(scholar);
    res.send({msg:scholar})
}

// const scholarshipDeveloper = async function (req, res) {
//     let array = []
//     let developerScholarship = await developerModel.find()
//     for (let i = 0; i < developerScholarship.length; i++) {
//         if (developerScholarship[i].gender === "Female" && developerScholarship[i].percentage >= 70) {
//             arr = array.push(developerScholarship[i])
//         }
//     }
//     res.send({ msg: array })
// }


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


const  getDeveloper= async function(req,res){
    const query1 = req.query                
    console.log(query1);       
    let batch1 = await batchModel.find({name:query1.program}).select({_id:1})    
    let developerQuery = await developerModel.find({percentage:{$gte:query1.percentage}, batch:batch1})   
    res.send({msg:developerQuery})
}

// ------------------------------------------------------------------------------------------------------------------------

module.exports.createDeveloper = createDeveloper
module.exports.scholarshipDeveloper = scholarshipDeveloper
module.exports.getDeveloper = getDeveloper


