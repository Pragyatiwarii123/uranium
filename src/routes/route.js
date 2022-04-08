const express = require('express');
const logger = require('./logger')

const router = express.Router();

let array = [1,2,3,4,5,7,8,9]

router.get('/missingNumbers', function (req, res) {
    let n= array.length +1
    let sum=0
    for(i=0;i<array.length;i++){
        
        sum = sum + array[i]
    }
    let missingNumber = (n*(n+1)/2) - sum
    res.send([missingNumber])
});
let array2=[33,34,35,37,38,39]
router.get('/Numbers', function (req, res) {
    let n= array2.length 
    a=33
    d=1
    let sum=0
    for(i=0;i<array2.length;i++){
        
        sum = sum + array2[i]
    }
    let missingNumber = (n*(2*a+(n-1)*d)/2) - sum
    res.send([missingNumber])
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