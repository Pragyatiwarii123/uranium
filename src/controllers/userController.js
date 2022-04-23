const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
// ------------------------------------------------------------------------------------------------

const createUser = async function (req, res) {
    try {
        let data = req.body;
        if(!data.firstName||!data.emailId)  res.status(400).send({msg:"fill the mandantory field"})
        let savedData = await userModel.create(data)   
         res.status(201).send({ msg: savedData })
    }


    catch (error) {
        res.status(500).send({ msg: "error", error: error.message })
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const loginUser = async function (req, res) {
    try {
        let userName = req.body.emailId
        let password1 = req.body.password
        let user = await userModel.findOne({ emailId: userName, password: password1 })
        // let fals={msg:"hkjhjkh"}
        if (!user) return res.status(400).send({ status: false, msg: "Incorrect username or password " })

        let token = jwt.sign(
            {
                userId: user._id.toString()
                // batch: "thorium",
                // organisation: "FUnctionUp",
            },
            "functionup-thorium"
        )
        console.log(typeof token);
        res.setHeader("x-auth-token", token);
        res.status(201).send({ status: true, data: token })
    }
    catch (err) {
        res.status(500).send({ msg: "error", error: err.message })
    }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          

const getUserData = async function (req, res) {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];
    // if (!token) return res.send({ status: false, msg: "token must be present" });

    // let decodedToken = jwt.verify(token, "functionup-thorium");
    // if (!decodedToken)
    //     return res.send({ status: false, msg: "token is invalid" });

    try {
        let userId = req.params.userId;
        let userDetails = await userModel.findById(userId)
        if (!userDetails)
            return res.status(400).send({ status: false, msg: "No such user exists" })

        res.status(200).send({ status: true, data: userDetails })
    }

    catch (problem) {
        res.status(500).send({ msg: "error", error: problem.message })
    }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const updateUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        //console.log(userId)
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).send("No such user exists");
        }
        console.log(userId)
        let userData = req.body;
        let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true })    //{age:20}
        res.status(201).send({ updatedUser })
    }

    catch (err) {
        res.status(500).send({ msg: "error", error: err.message })
    }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const deleteUser = async function (req, res) {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];
    // if (!token) return res.send({ status: false, msg: "token must be present" });

    // let decodedToken = jwt.verify(token, "functionup-thorium");
    // if (!decodedToken)
    //     return res.send({ status: false, msg: "token is invalid" });

    try {
        let userId = req.params.userId;
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).send("No such user exists");
        }
        let userData = req.body;
        let deletedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true })
        res.status(201).send({ deletedUser })
    }

    catch (error) {
        res.status(500).send({ msg: "error", error: error.message })
    }
};

// ****************************************************************************************************************
// ****************************************************************************************************************


const postMessage = async function (req, res) {
    try {
        let token = req.headers["x-Auth-token"];
        if (!token) token = req.headers["x-auth-token"];
        // if (!token) return res.send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "functionup-thorium");
        // if (!decodedToken)
        //     return res.send({ status: false, msg: "token is invalid" })

        let message = req.body.message
        //let userId = req.params.userId;
        let userToBeModified = req.params.userId
        console.log(userToBeModified)
        let userLoggedIn = decodedToken.userId
        console.log(userLoggedIn)
        if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: "user logged in is not allowed to modify requested user data" })
        let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { posts: message }, { new: true })    //{age:20}
        res.status(201).send({ updatedUser })
    }

    catch (problem) {
        res.status(500).send({ msg: "error", error: problem.message })
    }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage
