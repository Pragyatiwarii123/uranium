const batchModel = require("../models/batchModel")
const developerModel = require("../models/developerModel")

const createDeveloper = async function (req, res) {
    let develop = req.body
    let developerCreated = await developerModel.create(develop)
    res.send({ data: developerCreated })
}

const scholarshipDeveloper = async function (req, res) {

    //  let developerScholarship = await developerModel.find({percentage:{$gte:70},gender:"Female"})
    let array = []
    let developerScholarship = await developerModel.find()
    for (let i = 0; i < developerScholarship.length; i++) {
        if (developerScholarship[i].gender === "Female" && developerScholarship[i].percentage >= 70) {
            arr = array.push(developerScholarship[i])
        }
    }
    // res.send({data: developerScholarship}) 
    res.send({ msg: array })
}



const  getDeveloper= async function(req,res){
    const query1 = req.query    // { percentage: '70', program: 'Radium' }  these are paramas
    console.log(query1);      
    let batch1 = await batchModel.find({name:query1.program}).select({_id:1})    //select the id of radium here [{}]
    console.log(batch1)
      id1=batch1[0]._id.toString()      // to change objectId to string
    let developerQuery = await developerModel.find({percentage:{$gte:query1.percentage}, batch:id1})    //now just filter the content
    res.send({msg:developerQuery})
   
    // 
}





module.exports.createDeveloper = createDeveloper
module.exports.scholarshipDeveloper = scholarshipDeveloper
module.exports.getDeveloper = getDeveloper


