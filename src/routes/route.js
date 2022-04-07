const express = require('express');
const logger = require('./logger')

const router = express.Router();

let array = ["pragya","aku","swati","vivek","golu","tej","shivu","fermi","richi","ayush"]

router.get('/all candidates', function (req, res) {
   
    // console.log(array)
    console.log('------------------')
    res.send(array)
});

router.get('/candidates', function (req, res) {
    let count1 = req.query.count
    let array2=[]
    if(req.query.count<=10){
        for(let i=0;i<req.query.count;i++){ 
            array2[i]=array[i]
        }
    }

    res.send(array2)    /////one time 
});




module.exports = router;
// adding this comment for no reason