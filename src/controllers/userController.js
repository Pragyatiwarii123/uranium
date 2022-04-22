const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
// ------------------------------------------------------------------------------------------------

const createUser = async function (req, res) {
    let data = req.body;
    let savedData = await userModel.create(data)
    res.send({ msg: savedData })
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const loginUser = async function (req, res) {
    let userName = req.body.emailId
    let password1 = req.body.password
    let user = await userModel.findOne({ emailId: userName, password: password1 })
    if (!user) return res.send({ status: false, msg: "Incorrect username or password " })

    let token = jwt.sign(
        {
            userId: user._id.toString(),
            batch: "thorium",
            organisation: "FUnctionUp",
        },
        "functionup-thorium"
    )
    //res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          

const getUserData = async function (req, res) {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];
    // if (!token) return res.send({ status: false, msg: "token must be present" });

    // let decodedToken = jwt.verify(token, "functionup-thorium");
    // if (!decodedToken)
    //     return res.send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId)
    if (!userDetails)
        return res.send({ status: false, msg: "No such user exists" });

    res.send({ status: true, data: userDetails });
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const updateUser = async function (req, res) {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];
    // if (!token) return res.send({ status: false, msg: "token must be present" });

    // let decodedToken = jwt.verify(token, "functionup-thorium");
    // if (!decodedToken)
    //     return res.send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }
    console.log(userId)
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({_id:userId},userData,{new:true})    //{age:20}
    res.send({ updatedUser })
};
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const deleteUser = async function (req, res) {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];
    // if (!token) return res.send({ status: false, msg: "token must be present" });

    // let decodedToken = jwt.verify(token, "functionup-thorium");
    // if (!decodedToken)
    //     return res.send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }
    let userData = req.body;
    let deletedUser = await userModel.findOneAndUpdate({_id:userId},{isDeleted:true},{new:true})
    res.send({ deletedUser })
};


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
