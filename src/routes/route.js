const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const userMw = require("../userMiddleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",userMw.mid1, userController.getUserData)

router.put("/users/:userId",userMw.mid1, userController.updateUser)

router.delete("/users/:userId",userMw.mid1, userController.deleteUser)

router.post("/users/:userId/posts",userMw.mid1, userController.postMessage)


module.exports = router;