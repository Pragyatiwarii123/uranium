const express = require('express');
const logger = require('./logger')

const router = express.Router();

array = ["Simran","tanu weds manu","Panga","Thalaivi","Tiranga"]
router.get('/movies', function (req, res) {
    res.send(array)
});

router.get('/movie/:indexNumber', function(req, res) {
    const indexNum = req.params.indexNumber
    if(indexNum<array.length){
        res.send(array[indexNum])
    }
    else{
        res.send("Please enter the correct index value ")
    }   
})

const movies=[ {
    "id": 1,
    "name": "Tiranga"
   }, {
    "id": 2,
    "name": "Border"
   }, {
    "id": 3,
    "name": "Krantiveer"
   }, {
    "id": 4,
    "name": "Kedarnath"
   }]
   router.get('/films', function (req, res) {
    res.send(movies)
});
router.get('/films/:filmId', function(req, res) {
    const filmIndex = req.params.filmId
    for(let i=0;i<movies.length;i++){
    if(filmIndex==movies[i].id){
     result = movies[i]                                                           //res.send(movies[i])
        
    }
     else if(filmIndex > movies.length)                                          //(filmIndex!=movies[i].id)
    {
      result = "No such movies exist with this Id"                            //res.send("No movie exist with this Id ")
    } 


    }  
    res.send(result)
})

   




module.exports = router;
// adding this comment for no reason