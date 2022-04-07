const d = new Date()
const day = function getDate(){
    console.log(d.getDate());
}
module.exports.name=day

const month = function getMonth(){
    console.log(d.getMonth()+1)
}
module.exports.branch=month

const batch = function getBatchInfo(){
    console.log("Uranium, W2D1, the topic for today is Nodejs module system")
    
}
module.exports.batches = batch
