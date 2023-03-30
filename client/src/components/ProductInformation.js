import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

//{ productData }
const ProductInformation = ({productData}) => {
    // const [productData, setProductData] = useState(null)
    
    try {
        axios.get("http://localhost:8000/products", {
            productData
        })
    } catch (err) {
        console.log(err)
    }

    // useEffect(() => {
    //     fetch("http://localhost:8000/products").then((res) => {
    //         return res.json()
    //     }).then((response) => {
    //         setProductData(response)
    //     }).catch((err) => {
    //         console.log(err.message)
    //     })
    // })
    console.log(productData)
    return (
        <div>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {/* <TableCell>{productData}</TableCell> */}
                        {productData && productData.map((products, i) => (
                            <TableRow >
                                <TableCell>{products.productId}</TableCell>
                                <TableCell>{products.productName}</TableCell>
                                <TableCell>{products.productOwnerName}</TableCell>
                                <TableCell>{products.developers}</TableCell>
                                <TableCell>{products.scrumMasterName}</TableCell>
                                <TableCell>{products.startDate}</TableCell>
                                <TableCell>{products.methodology}</TableCell>
                            </TableRow>
                        ))}
                        
                      
                            {/* <TableRow key={productData.productId}>
                                <TableCell>{productData.productId}</TableCell>
                                <TableCell>{productData.productName}</TableCell>
                                <TableCell>{productData.productOwnerName}</TableCell>
                                <TableCell>{productData.developers}</TableCell>
                                <TableCell>{productData.scrumMasterName}</TableCell>
                                <TableCell>{productData.startDate}</TableCell>
                                <TableCell>{productData.methodology}</TableCell>
                            </TableRow>
                       */}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductInformation
