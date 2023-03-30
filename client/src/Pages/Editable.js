import React from 'react'
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Editable = ({
    editTableData,
    editData,
    handleCancelClick,
}) => {

    return (
        <TableRow>
            <TableCell>
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    required="required"
                    placeholder="Enter a new Product Name"
                    name="Product Name"
                    value={editTableData.productName}
                    onChange={editData}
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    required="required"
                    placeholder="Enter a new Product Owner Name"
                    name="Product Owner Name"
                    value={editTableData.productOwnerName}
                    onChange={editData}
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    required="required"
                    placeholder="Enter new developers"
                    name="Developers"
                    value={editTableData.developers}
                    onChange={editData}
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    required="required"
                    placeholder="Enter a new Scrum Master Name"
                    name="Scrum Master Name"
                    value={editTableData.scrumMasterName}
                    onChange={editData}
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    required="required"
                    placeholder="Enter a new Start Date"
                    name="Start Date"
                    value={editTableData.startDate}
                    onChange={editData}
                />
            </TableCell>
            <TableCell>
                <Select
                    type="text"
                    required="required"
                    placeholder="Choose a new Methodology"
                    name="Methodology"
                    value={editTableData.methodology}
                    onChange={editData}
                >
                    <MenuItem value="Agile">Agile</MenuItem>
                    <MenuItem value="Waterfall">Waterfall</MenuItem>
                </Select>
            </TableCell>
            <TableCell>
                <Button type="submit" variant="contained">Save</Button>
                <Button type="button" onClick={handleCancelClick} variant="contained" color="error">Cancel</Button>
            </TableCell>
        </TableRow>
    )
}

export default Editable