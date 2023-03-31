import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ProductDialog from './ProductDialog';
import axios from 'axios';

const ProductPage = () => {
    const [productData, setProductData] = useState([]);
    const [productRows, setProductRows] = useState([]);
    const [requestMessage, setRequestMessage] = useState('');
    const [queryScrumMasterName, setQueryScrumMasterName] = useState("")
    const [queryDeveloperName, setQueryDeveloperName] = useState("")
    const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
    const [messageFromDialog, setMessageFromDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/products")
            .then((response) => {
                setProductData(response.data);
            }).catch((error) => {
                console.log(error)
            })
    }, []);

    /* Printing out all stored data */
    useEffect(() => {
        const rows = productData.map((product) => (
            <TableRow key={product.productId}>
                <TableCell>{product.productId}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productOwnerName}</TableCell>
                <TableCell>{product.developers.join(', ')}</TableCell>
                <TableCell>{product.scrumMasterName}</TableCell>
                <TableCell>{product.startDate}</TableCell>
                <TableCell>{product.methodology}</TableCell>
                <TableCell>
                    <Button
                        type="edit"
                        onClick={() => {
                            setSelectedProduct(product);
                            setOpenAddProductDialog(true);
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Edit
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                        type="delete"
                        onClick={() => deleteProduct(product)}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        ));
        setProductRows(rows);
    }, [productData]);

    /* Deleting selected data and updating remaining data */
    const deleteProduct = (product) => {
        axios.delete(`http://localhost:8000/products/${product.productId}`)
            .then(() => {
                const updatedProductData = productData.filter((p) => p.productId !== product.productId);
                setRequestMessage('Successfully Removed Record #' + product.productId)
                setProductData(updatedProductData);
            }).catch((error) => {
                console.log(error)
            })
    }

    /* Searching queries for scrumMasterName and developerName */
    const searchProducts = () => {
        let queries = {}
        if (queryScrumMasterName) {
            queries.scrumMasterName = queryScrumMasterName
        }
        if (queryDeveloperName) {
            queries.developerName = queryDeveloperName
        }
        axios.get("http://localhost:8000/products", { params: queries })
            .then((response) => {
                setProductData(response.data);
            }).catch((error) => {
                console.log(error)
            })
    }

    /* Adding Table when values are submitted */
    const handleAddProductData = (newProductData) => {
        setProductData([...productData, newProductData]);
    };
    /* Updating Table when values are submitted */
    const handleUpdateProduct = (updatedProduct) => {
        const updatedProducts = productData.map((product) => {
            if (product.productId === updatedProduct.productId) {
                return updatedProduct;
            } else {
                return product;
            }
        });
        setProductData(updatedProducts);
        setSelectedProduct(null);
    };

    const handleOpenProductDialog = () => {
        setOpenAddProductDialog(true);
    };

    const handleCloseProductDialog = () => {
        setOpenAddProductDialog(false);
    };

    /* Showing if data has been creaed, updated, or deleted  */
    const handleMessageFromDialog = (message) => {
        setMessageFromDialog(message);
    };

    return (
        <div>
            {
                messageFromDialog ? (<div>  {messageFromDialog} </div>)
                    : (<></>)
            }
            <div>
                <Button 
                    onClick={handleOpenProductDialog} 
                    variant="contained" 
                    color="primary" 
                    sx={{ m: 0.5 }}>
                    + Add Product
                </Button>
                <ProductDialog
                    open={openAddProductDialog}
                    handleClose={handleCloseProductDialog}
                    handleAddProductData={handleAddProductData}
                    handleUpdateProductData={handleUpdateProduct}
                    handleMessageFromDialog={handleMessageFromDialog}
                    selectedProduct={selectedProduct}
                />
                <Button
                    type="submit"
                    onClick={() => searchProducts()}
                    variant="contained"
                    color="success"
                    sx={{ m: 0.5, float: "right" }}
                    style={{ marginBottom: "auto" }}
                >
                    Search
                </Button>
                <TextField
                    label="Search Developer"
                    value={queryDeveloperName}
                    sx={{ m: 0.5, float: "right" }}
                    onChange={(e) => setQueryDeveloperName(e.target.value)}
                />
                <TextField
                    label="Search Scrum Master"
                    value={queryScrumMasterName}
                    sx={{ m: 0.5, float: "right" }}
                    onChange={(e) => setQueryScrumMasterName(e.target.value)}
                />
            </div>
            <div>
                {requestMessage}
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow align="left">
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Owner Name</TableCell>
                            <TableCell>Developers</TableCell>
                            <TableCell>Scrum Master Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Methodology</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ProductPage;
