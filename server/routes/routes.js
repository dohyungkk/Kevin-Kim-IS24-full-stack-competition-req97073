const express = require('express')
const { getProducts, createProducts } = require('../controller/controller')

const router = express.Router();

router.get("/products", getProducts)
router.post("/product", createProducts)
// router.patch("/:id", updateTeam)
// router.delete("/:id", deleteTeam)

module.exports = router