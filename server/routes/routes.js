const express = require('express')
const { getProducts, createProduct, updateProduct, deleteProduct, getProduct } = require('../controller/controller')

const router = express.Router();

router.get("/products", getProducts)
router.post("/products", createProduct)
router.patch("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)
router.get("/products/:id", getProduct)

module.exports = router