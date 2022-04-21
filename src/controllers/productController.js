const req = require("express/lib/request")
const ProductModel= require("../models/productModel")


const createProduct =async function(req, res) {
    let product = req.body
    let productCreated = await ProductModel.create(product)
    res.send({msg:productCreated})
}



module.exports.createProduct = createProduct
