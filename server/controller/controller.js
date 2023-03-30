const fs = require("fs")
// const { v4: uuidv4 } = require('uuid')

// uuidv4()

let products = []

exports.getProducts = (req, res) => {
    res.send(products)
}

exports.createProduct = (req, res) => {
    const product = req.body
    products.push({...product})

    res.send("product added")
}

exports.updateProduct = (req, res) => {
    const product = products.find((product) => product.id === req.params.id)
    product.productName = req.body.productName
}

exports.deleteProduct = (req, res) => {
    products = products.filter((product) => product.productId !== req.params.id)
}

exports.getProduct = (req, res) => {
    res.send(req.params.productId)
}