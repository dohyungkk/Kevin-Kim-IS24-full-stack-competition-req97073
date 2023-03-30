import React from 'react'
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ReadOnly = ({ product, handleEditClick, deleteData }) => {
    return (
        <TableRow
            key={product.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            align="left"
            >
            <TableCell>{product.productName}</TableCell>
            <TableCell>{product.productOwnerName}</TableCell>
            <TableCell>{product.developers}</TableCell>
            <TableCell>{product.scrumMasterName}</TableCell>
            <TableCell>{product.startDate}</TableCell>
            <TableCell>{product.methodology}</TableCell>
            <TableCell>
                <Button type="edit" onClick={(e) => handleEditClick(e, product)} variant="contained" color="success">Edit</Button>
                <Button type="delete" onClick={() => deleteData(product.productId)} variant="contained" color="error">Delete</Button>
            </TableCell>
        </TableRow>
    )
}

export default ReadOnly;