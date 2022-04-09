const express = require('express');
const { status } = require('express/lib/response');

const router = express.Router();
let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ]
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ]
       },
   ]
   router.post('/test-post2', function (req, res) {
    // let data= req.body
    // let data1= req.body.name
    // console.log(players.push(req.body))
    for(i=0;i<players.length;i++){
        if(players[i].name==req.body.name){
            result = true
            break    
        }
    else if(players[i].name!=req.body.name)
    {
        result = false   
    }
}
if (result==false)
{players.push(req.body)}
    
    res.send( { data: players , status: true }  )
});





// router.get('/test-api1', function (req, res) {

//     res.send( "hi FunctionUp " )
// });


// router.get('/test-api2', function (req, res) {

//     res.send( { msg: "Hi FUnctionUp..again !"} )
// });


// router.get('/test-api3', function (req, res) {

//     res.send( { msg: "Hi FUnctionUp..again..this is another similar api !"} )
// });


// router.get('/test-api4', function (req, res) {

//     res.send( { msg: "Hi FUnctionUp..again..this is another similar api ..not I am getting bored!"} )
// });


// router.get('/test-api5', function (req, res) {

//     res.send( { msg: "Hi FUnctionUp" , name:"FunctionUp", age: "100"} )
// });



// router.get('/test-api6', function (req, res) {

//     res.send( {   data: [12, 24, 36, 48, 60]  }   )
// });

// router.post('/test-post1', function (req, res) {

//     res.send( {  msg: "hi guys"  }   )
// });


// to send data in  post request-> prefer sending in BODY -> click body-raw-json
// router.post('/test-post2', function (req, res) {
//     let data= req.body
//     console.log(data)
//     res.send( {  msg: "hi guys..my 2nd post req"  }   )
// });


//const randomController= require("../controllers/randomController.js")
//write a post request to accept an element in post request body and add it to the given array and return the new array
//router.post('/test-post2', randomController.addToArray ); //HANDLER/CONTROLLER



module.exports = router;
