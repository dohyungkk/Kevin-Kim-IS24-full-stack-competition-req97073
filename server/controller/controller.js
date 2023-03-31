const fs = require("fs")


/* This represents existing records in a database as dummy data */
let products = [
    {
        "id": 1,
        "productName": "Car",
        "productOwnerName": "John Doe",
        "developers": ['Kevin One', 'Kevin Two', 'Kevin Three'],
        "scrumMasterName": "John Kim",
        "startDate": "2022/04/13",
        "methodology": "Waterfall"
    },
    {
        "id": 2,
        "productName": "Truck",
        "productOwnerName": "Richard Roe",
        "developers": ['Tyler One', 'Tyler Two'],
        "scrumMasterName": "Kev Kang",
        "startDate": "2022/08/13",
        "methodology": "Agile"
    },
    {
        "id": 3,
        "productName": "Phone",
        "productOwnerName": "Harry Potter",
        "developers": ['Rachel Three', 'Rachel Four', 'Rachel Five'],
        "scrumMasterName": "Hannah Her",
        "startDate": "2023/01/13",
        "methodology": "Agile"
    },
    {
        "id": 4,
        "productName": "Watch",
        "productOwnerName": "Jane Joe",
        "developers": ['Hi Five', 'Hi Six', 'Hi Seven'],
        "scrumMasterName": "Jamie Mie",
        "startDate": "2023/03/13",
        "methodology": "Agile"
    }
]

/* This isn't needed if we're using a database with an incremental primary key - ID */
let nextPrimaryID = 5

exports.getProducts = (req, res) => {
    let filteredProducts = products

    if('scrumMasterName' in req.query) {
        filteredProducts = filteredProducts.filter((product) => product.scrumMasterName === req.query.scrumMasterName)
    }

    if('developerName' in req.query) {
        filteredProducts = filteredProducts.filter((product) => product.developers.indexOf(req.query.developerName) !== -1)
    }

    res.send(filteredProducts)
}

exports.createProduct = (req, res) => {
    const validationResult = validateInputs(req)

    if( validationResult.result == false ) {
        res.status(validationResult.status).send(validationResult.message)
    }

    const product = buildProductData(nextPrimaryID, req.body)

    products.push({...product})
    nextPrimaryID += 1

    res.status(201).send("product added")
}

exports.updateProduct = (req, res) => {
    const productID = parseInt(req.params.id)
    const index = products.findIndex((product) => product.id === productID)
    if(index === -1) {
        res.status(404).send('Record Not Found')
    }

    const validationResult = validateInputs(req)
    if( validationResult.result == false ) {
        res.status(validationResult.status).send(validationResult.message)
    }

    const updatedProduct = buildProductData(req.params.id, req.body)

    products[index] = updatedProduct

    res.status(200).send("Successfully updated")
}

//200 204
exports.deleteProduct = (req, res) => {
    const productID = parseInt(req.params.id)
    const product = products.find((product) => product.id === productID)
    if (!product) {
        res.status(404).send('Record Not Found')
    }

    products = products.filter((product) => product.id !== productID)

    /* TODO: 204? */
    res.status(200).send("Successfully deleted")
}

exports.getProduct = (req, res) => {
    const productID = parseInt(req.params.id)
    const product = products.find((product) => product.id === productID)
    if (!product) {
        res.status(404).send('Record Not Found')
    }
    res.send(product)
}


const validateInputs = (req) => {
    if( req.body.productName === '' || req.body.productOwnerName === '' || req.body.scrumMasterName === '' ) {
        return {
            result: false,
            message: 'Field cannot be blank',
            status: 400
        }
    }

    /* RegEx from https://stackoverflow.com/questions/18758772/how-do-i-validate-a-date-in-this-format-yyyy-mm-dd-using-jquery */
    const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!req.body.startDate.match(dateRegEx)){
        return {
            result: false,
            message: 'Incorrect Start Date Format',
            status: 400
        }
    }

    if ( req.body.developers.length > 5) {
        return {
            result: false,
            message: 'Developers can be only up to 5',
            status: 400
        }
    }

    if ( req.body.methodology !== "Agile" && req.body.methodology !== "Waterfall") {
        return {
            result: false,
            message: 'Methodology can only be either Agile or Waterfall',
            status: 400
        }
    }

    return {
        result: true,
        message: null,
        status: null
    }
}

const buildProductData = (id, data) => {
    return {
        "id": parseInt(id), /* If it was a real database, this is not needed. */
        "productName": data.productName,
        "productOwnerName": data.productOwnerName,
        "developers": data.developers,
        "scrumMasterName": data.scrumMasterName,
        "startDate": data.startDate,
        "methodology": data.methodology
    }
}