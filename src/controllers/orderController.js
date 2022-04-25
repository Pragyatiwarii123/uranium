const req = require("express/lib/request")
const ProductModel = require("../models/productModel")
const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")


const createOrder = async function (req, res) {
    let body = req.body
    let headers = req.headers
    let freeApp = headers["isFreeAppUser"]  
    if (!freeApp)
         freeApp = headers["isfreeappuser"]
    if (!freeApp) {
       return res.send({status:false, msg: "A mandatory header is misssing" })
    }

    let user_id = req.body.userId
    if(!user_id)return res.send({msg:"userId is required"})
    let user = await userModel.findById(user_id)
    if(!user) return res.send({msg:"user does not exit"})

    let product_id = req.body.productId
    if(!product_id)return res.send({msg:"productId is required"})
    let product = await ProductModel.findById(product_id)
    if(!product) return res.send({msg:"product does not exit"})

    let isFree //=false    //to convert freeapp into boolean       //if(true) or if(false)    //if("true")=>no string inside if()
    if(freeApp=="true"){isFree=true}
    else{ isFree=false}

    //let isFree = Boolean(freeApp)
    if(!isFree && user.balance>=product.price){    //if(!freeApp=="false" && user.balance>=product.price)
        user.balance = user.balance-product.price
        await user.save()
        body.amount = product.price
        body.isFreeAppUser=false
        let orderCreated = await orderModel.create(body)
        res.send({status:true,msg:orderCreated})
    }
    else if(!isFree && user.balance<product.price){
        res.send({status:false,msg:"insufficient balance to place an order"})
    }
    else{
        body.amount = 0
        body.isFreeAppUser=true
        let orderCreated = await orderModel.create(body)
        res.send({status:true,msg:orderCreated})

    }

   
}



























// const createOrder =async function(req, res) {
//     let orderData = req.body
//     let userId=orderData.userId
//     let productId=orderData.productId


//     if(!userId){
//         res.send({msg:"userId required"})
//     }
//     let user = await UserModel.findById(userId)
//     if(!user)
//     res.send({msg:"invalid userId"})



//     if(!productId){
//         res.send({msg:"productId required"})
//     }
//     let product = await ProductModel.findById(productId)
//     if(!product)
//     res.send({msg:"invalid productId"})


//     let head = req.headers
//     let isFreeAppUser = head.isfreeappuser 
//     if(isFreeAppUser=="true"){
//         let  orderData1 = await OrderModel.create(orderData) 
//         orderData1.amount=0
//         orderData1.isFreeAppUser=true
//         res.send({msg:orderData1})
//     }


//     let priceOfTheProduct = product.price
//     console.log(priceOfTheProduct);
//     let balanceAmountInWallet = user.balance
//     console.log(balanceAmountInWallet);
//     console.log(userId);
//     if(isFreeAppUser=="false"){
//         if(balanceAmountInWallet >= priceOfTheProduct){
//             let userBalance = await UserModel.updateMany({_id:userId},{$inc:{balance:-priceOfTheProduct}},{new:true})
//             let  orderData1 = await OrderModel.create(orderData) 
//             orderData1.amount=priceOfTheProduct
//             orderData1.isFreeAppUser=false
//             res.send({msg:orderData1})

//         }
//         else
//         {
//            res.send({msg:"Sorry! you can't buy this product as you have insufficient balance in your wallet"}) 
//         }

//     }



// }

module.exports.createOrder = createOrder