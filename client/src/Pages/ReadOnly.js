import React from 'react'
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ReadOnly = ({ products, handleEditClick, deleteData }) => {
    return (
        <TableRow
            key={products.productId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            align="left"
            >
            <TableCell>{products.productName}</TableCell>
            <TableCell>{products.productOwnerName}</TableCell>
            <TableCell>{products.developers}</TableCell>
            <TableCell>{products.scrumMasterName}</TableCell>
            <TableCell>{products.startDate}</TableCell>
            <TableCell>{products.methodology}</TableCell>
            <TableCell>
                <Button type="edit" onClick={(e) => handleEditClick(e, products)} variant="contained" color="success">Edit</Button>
                <Button type="delete" onClick={() => deleteData(products.productId)} variant="contained" color="error">Delete</Button>
            </TableCell>
        </TableRow>
    )
}

export default ReadOnly;