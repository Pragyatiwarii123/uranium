const jwt = require("jsonwebtoken");

let mid1 = function (req, res, next) {
    try {
        let token = req.headers["x-Auth-token"];
        if (!token) token = req.headers["x-auth-token"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "functionup-thorium");
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "token is invalid" });

        // res.send({msg:"hello"})
        next()
    }

    catch (err) {
        res.status(500).send({ msg: "error", error: err.message })
    }
}
module.exports.mid1 = mid1