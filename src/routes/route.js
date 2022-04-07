const express = require('express');
const pragya = require('../logger/logger')
const name1 = require('../util/helper')
const formatter = require('../validator/formatter')
const _ =require("lodash")

const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('I am inside the first route handler')
    console.log('Calling log function')
    pragya.come()
    console.log("calling date function")
    name1.name()
    name1.branch()
    name1.batches()
    formatter.trim1()
    formatter.changetoLowerCase1()
    formatter.changeToUpperCase1()
    
    res.send('My first ever api!')
});

const arrayMonth =["jan","feb","march","apri","may","june","july","aug","sept","oct","nov","dec"]
const arrayOdd = [1,3,5,7,9,11,13,15,17,19]
const a1 = [1,2,3,4],a2 = [2,3,4,5], a3 = [3,4,5,6], a4 = [4,5,6,7], a5 = [5,6,7,8]
const objectPair =  [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]

  
router.get('/hello', function (req, res) {
    console.log('I am inside the second route handler')
    console.log(_.chunk(arrayMonth,4))
    console.log(_.tail(arrayOdd))
    console.log(_.union(a1,a2,a3,a4,a5))
                
    let obj = _.fromPairs(objectPair);
    console.log(obj)           //console.log(_.fromPairs(objectPair))
    res.send('My first ever api!')
});



module.exports = router;
// adding this comment for no reason