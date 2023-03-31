const fs = require("fs")


/* This represents existing records in a database as dummy data */
let products = [
    {
        "productId": 1,
        "productName": "Car",
        "productOwnerName": "John Doe",
        "developers": ['Kevin One', 'Kevin Two', 'Kevin Three'],
        "scrumMasterName": "John Kim",
        "startDate": "2022-04-13",
        "methodology": "Waterfall"
    },
    {
        "productId": 2,
        "productName": "Truck",
        "productOwnerName": "Richard Roe",
        "developers": ['Tyler One', 'Tyler Two'],
        "scrumMasterName": "Kev Kang",
        "startDate": "2022-08-13",
        "methodology": "Agile"
    },
    {
        "productId": 3,
        "productName": "Phone",
        "productOwnerName": "Harry Potter",
        "developers": ['Rachel Three', 'Rachel Four', 'Rachel Five'],
        "scrumMasterName": "Hannah Her",
        "startDate": "2023-01-13",
        "methodology": "Agile"
    },
    {
        "productId": 4,
        "productName": "Watch",
        "productOwnerName": "Jane Joe",
        "developers": ['Hi Five', 'Hi Six', 'Hi Seven'],
        "scrumMasterName": "Jamie Mie",
        "startDate": "2023-03-13",
        "methodology": "Waterfall"
    }
]

/* This isn't needed if we're using a database with an incremental primary key - ID, 
   set as 5 for now as there are 4 dummy data at the moment */
let nextPrimaryID = 5

/* Gets all products that are added */
exports.getProducts = (req, res) => {
    let filteredProducts = products

    /* Filters all products that has the same scrumMasterName as a query */
    if('scrumMasterName' in req.query) {
        filteredProducts = filteredProducts.filter((product) => product.scrumMasterName === req.query.scrumMasterName)
    }

    /* Filters all products that has the same developers as a query. Using indexOf to filter through array of developers */
    if('developerName' in req.query) {
        filteredProducts = filteredProducts.filter((product) => product.developers.indexOf(req.query.developerName) !== -1)
    }
    res.send(filteredProducts)
}

/* Creates a product when "Add" on a dialog form */
exports.createProduct = (req, res) => {
    /* Validates request */
    const validationResult = validateInputs(req)

    /* Sends status and message when validation has not met */
    if( validationResult.result == false ) {
        res.status(validationResult.status).send(validationResult.message)
    }

    /* Stores an added product data */
    const product = buildProductData(nextPrimaryID, req.body)

    /* Adds new product to an array and increment ID by 1 */
    products.push({...product})
    nextPrimaryID += 1

    /* Extracts last product */
    const createdProduct = products.slice(-1)
    res.status(201).send(createdProduct[0])
}

/* Updates product when edit button is clicked */
exports.updateProduct = (req, res) => {
    /* req.params.productId was printing ID as string */
    const selectedProductID = parseInt(req.params.productId)
    const index = products.findIndex((product) => product.productId === selectedProductID)
    if(index === -1) {
        res.status(404).send('Record Not Found')
    }

    /* Sends status and message when validation has not met */
    const validationResult = validateInputs(req)
    if( validationResult.result == false ) {
        res.status(validationResult.status).send(validationResult.message)
    }

    /* Updates product data, but keep the ID */
    const updatedProduct = buildProductData(req.params.productId, req.body)

    products[index] = updatedProduct

    res.status(200).send(updatedProduct)
}

/* Deletes a product that is matching in ID */
exports.deleteProduct = (req, res) => {
    const selectedProductID = parseInt(req.params.productId)
    const product = products.find((product) => product.productId === selectedProductID)
    if (!product) {
        res.status(404).send('Record Not Found')
    }
    products = products.filter((product) => product.productId !== selectedProductID)

    /* This could be 204 without any content */
    res.status(200).send(product)
}

/* Gets a product with matching ID */
exports.getProduct = (req, res) => {
    const selectedProductID = parseInt(req.params.productId)
    const product = products.find((product) => product.productId === selectedProductID)
    if (!product) {
        res.status(404).send('Record Not Found')
    }
    res.send(product)
}

/* Function for validation */
const validateInputs = (req) => {
    /* productName, productOwnerName, and scrumMasterName cannot be empty */
    if( req.body.productName === '' || req.body.productOwnerName === '' || req.body.scrumMasterName === '' ) {
        return {
            result: false,
            message: 'Field cannot be blank',
            status: 400
        }
    }

    /* RegEx from https://stackoverflow.com/questions/18758772/how-do-i-validate-a-date-in-this-format-yyyy-mm-dd-using-jquery */
    const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
    /* Start Date must be numeric in order to be stored */
    if(!req.body.startDate.match(dateRegEx)){
        return {
            result: false,
            message: 'Incorrect Start Date Format',
            status: 400
        }
    }

    /* Setting maximum number of developers as 5 */
    if ( req.body.developers.length > 5) {
        return {
            result: false,
            message: 'Developers can be only up to 5',
            status: 400
        }
    }

    /* Methodology can only be either Agile or Waterfall */
    if ( req.body.methodology !== "Agile" && req.body.methodology !== "Waterfall") {
        return {
            result: false,
            message: 'Methodology can only be either Agile or Waterfall',
            status: 400
        }
    }

    /* Else if there is no mistake or no restriction has met */
    return {
        result: true,
        message: null,
        status: null
    }
}

/* Initializing buildProductData to add a new product */
const buildProductData = (id, data) => {
    return {
        "productId": parseInt(id), /* If it was a real database, this is not needed. */
        "productName": data.productName,
        "productOwnerName": data.productOwnerName,
        "developers": data.developers,
        "scrumMasterName": data.scrumMasterName,
        "startDate": data.startDate,
        "methodology": data.methodology
    }
}