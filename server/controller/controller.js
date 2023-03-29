
let products = []

exports.getProducts = (req, res) => {
    res.send(products)
}

exports.createProducts = (req, res) => {
    const product = req.body

    products.push({...product})
    res.send("product added")
}