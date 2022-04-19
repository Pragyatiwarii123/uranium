const express = require('express');
const router = express.Router();



const batchController= require("../controllers/batchController")
const developerController= require("../controllers/developerController")


router.post("/createBatch", batchController.createbatch)
router.post("/createDeveloper", developerController.createDeveloper)
router.get("/scholarshipDeveloper", developerController.scholarshipDeveloper)
router.get("/developers", developerController.getDeveloper)








module.exports = router;