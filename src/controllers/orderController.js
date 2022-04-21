const req = require("express/lib/request")
const OrderModel= require("../models/orderModel")
const UserModel = require("../models/userModel")
const ProductModel= require("../models/productModel")



const createOrder =async function(req, res) {
    let orderData = req.body
    let userId=orderData.userId
    let productId=orderData.productId


    if(!userId){
        res.send({msg:"userId required"})
    }
    let user = await UserModel.findById(userId)
    if(!user)
    res.send({msg:"invalid userId"})



    if(!productId){
        res.send({msg:"productId required"})
    }
    let product = await ProductModel.findById(productId)
    if(!product)
    res.send({msg:"invalid productId"})


    let head = req.headers
    let isFreeAppUser = head.isfreeappuser 
    if(isFreeAppUser=="true"){
        let  orderData1 = await OrderModel.create(orderData) 
        orderData1.amount=0
        orderData1.isFreeAppUser=true
        res.send({msg:orderData1})
    }


    let priceOfTheProduct = product.price
    console.log(priceOfTheProduct);
    let balanceAmountInWallet = user.balance
    console.log(balanceAmountInWallet);
    console.log(userId);
    if(isFreeAppUser=="false"){
        if(balanceAmountInWallet >= priceOfTheProduct){
            let userBalance = await UserModel.updateMany({_id:userId},{$inc:{balance:-priceOfTheProduct}},{new:true})
            let  orderData1 = await OrderModel.create(orderData) 
            orderData1.amount=priceOfTheProduct
            orderData1.isFreeAppUser=false
            res.send({msg:orderData1})

        }
        else
        {
           res.send({msg:"Sorry! you can't buy this product as you have insufficient balance in your wallet"}) 
        }

    }



}

module.exports.createOrder = createOrder