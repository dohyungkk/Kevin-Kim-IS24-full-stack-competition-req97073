const express = require('express')
const { getProducts, createProduct, updateProduct, deleteProduct, getProduct } = require('../controller/controller')

const router = express.Router();

router.get("/products", getProducts)
router.post("/products", createProduct)
router.patch("/products/:productId", updateProduct)
router.delete("/products/:productId", deleteProduct)
router.get("/products/:productId", getProduct)

module.exports = router