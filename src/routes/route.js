const express = require('express');
const logger = require('./logger')

const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('my first request')
    console.log('the endpoint value is',logger.url)
    console.log('Calling log function')
    logger.logging()
    res.send('My first ever api!')
    console.log(module)
});
router.get('/test-me1', function (req, res) {
    res.send('My second ever api!')
});
router.get('/test-me2', function (req, res) {
    res.send('My forever api!')
});

module.exports = router;
// adding this comment for no reason