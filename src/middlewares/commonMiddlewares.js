// const UserModel = require("../models/userModel")
// const OrderModel = require("../models/orderModel")


const mid4 = function (req, res, next) {
    let head = req.headers
    let isfree = head.isfreeappuser
    if (isfree){ 
        next()
    }
    else {
        res.send({ msg: "the request is missing a mandatory header" })
    }
}



// module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
module.exports.mid4 = mid4
