import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';

const ProductDialog = ({
    open,
    handleClose,
    handleAddProductData,
    handleUpdateProductData,
    handleMessageFromDialog,
    selectedProduct
}) => {
    const [productName, setProductName] = useState('')
    const [productOwnerName, setProductOwnerName] = useState('')
    const [scrumMasterName, setScrumMasterName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [developers, setDevelopers] = useState(['', '', '', '', '']);
    const [methodology, setMethodology] = useState('')

    /* Setting developers up to 5, and fills developers in order */
    const MAX_DEVELOPERS = 5;
    const developerTextFields = Array(MAX_DEVELOPERS)
        .fill("")
        .map((_, index) => ({
            value: developers[index] || "",
            key: index,
        }));

    /* Checking if TextField is filled */
    const [isFilled, setIsFilled] = useState(false);

    /* Fetching all stored values */
    useEffect(() => {
        if (selectedProduct) {
            setProductName(selectedProduct.productName);
            setProductOwnerName(selectedProduct.productOwnerName);
            setScrumMasterName(selectedProduct.scrumMasterName);
            setStartDate(selectedProduct.startDate);
            setDevelopers(selectedProduct.developers);
            setMethodology(selectedProduct.methodology);
        }
    }, [selectedProduct]);

    /* Clearing fields when added or updated */
    const clearFields = () => {
        setProductName('')
        setProductOwnerName('')
        setScrumMasterName('')
        setStartDate('')
        setDevelopers(['', '', '', '', ''])
        setMethodology('')
    }

    /* Checking which developer (from 1 to 5) to handle */
    const handleDeveloperNameChange = (e, index) => {
        const newDevelopers = [...developers];
        newDevelopers[index] = e.target.value;
        setDevelopers(newDevelopers);
    };

    /* Adding product and posting it on backend using axios */
    const handleAddProduct = () => {
        const data = buildProductPayload()
        axios.post('http://localhost:8000/products', data)
            .then((response) => {
                handleAddProductData(response.data)
                handleMessageFromDialog('Successfully Created!')
                clearFields()
                handleClose()
            }).catch((error) => {
                console.log(error)
            })
        setIsFilled(true);
    };

    /* Updating product and patching it on backend using axios */
    const handleUpdateProduct = () => {
        const data = buildProductPayload()
        axios.patch(`http://localhost:8000/products/${selectedProduct.productId}`, data)
            .then((response) => {
                handleUpdateProductData(response.data)
                handleMessageFromDialog('Successfully Updated!')
                clearFields()
                handleClose()
            }).catch((error) => {
                console.log(error)
            })
        setIsFilled(true);
    };

    /* Storing each value */
    const buildProductPayload = () => {
        return {
            "productName": productName,
            "productOwnerName": productOwnerName,
            "developers": developers.filter(function (developerName) { return developerName }), /* Remove all the falsey names */
            "scrumMasterName": scrumMasterName,
            "startDate": startDate,
            "methodology": methodology
        }
    }

    return (
        /* Pop up to add or edit each data */
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{selectedProduct ? 'Update' : 'Add'} Product</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    label="Product Name"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    error={isFilled && productName === ''}
                    helperText={isFilled && productName === '' ? 'Product Name cannot be empty' : ''}
                />
                <TextField
                    required
                    label="Product Owner Name"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={productOwnerName}
                    onChange={(e) => setProductOwnerName(e.target.value)}
                    error={isFilled && productOwnerName === ''}
                    helperText={isFilled && productOwnerName === '' ? 'Product Owner Name cannot be empty' : ''}
                />
                <TextField
                    required
                    key={developerTextFields[0].key}
                    label="Developer 1"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={developerTextFields[0].value}
                    onChange={(e) => handleDeveloperNameChange(e, 0)}
                    error={isFilled && developerTextFields[0].value === ""}
                    helperText={isFilled && developerTextFields[0].value === "" ? 'Developer Name 1 cannot be empty' : ''}
                />
                {/* Taking out Developer 1 field to set restriction on just Developer 1, and using slice(1) to map Developer 2~5 fields */}
                {developerTextFields.slice(1).map(({ value, key }) => (
                    <TextField
                        required
                        key={key}
                        label={`Developer ${key + 1}`}
                        fullWidth
                        sx={{ m: 0.5 }}
                        value={value}
                        onChange={(e) => handleDeveloperNameChange(e, key)}
                    />
                ))}
                <TextField
                    required
                    label="Scrum Master Name"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={scrumMasterName}
                    onChange={(e) => setScrumMasterName(e.target.value)}
                    error={isFilled && scrumMasterName === ''}
                    helperText={isFilled && scrumMasterName === '' ? 'Scrum Master Name cannot be empty' : ''}
                />
                <TextField
                    required
                    label="YYYY-MM-DD"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    error={isFilled && startDate === ''}
                    helperText={isFilled && startDate === '' ? 'Start Date cannot be empty' : ''}
                />
                <InputLabel>Methodology</InputLabel>
                <Select
                    required
                    label="Methodology"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={methodology}
                    onChange={(e) => setMethodology(e.target.value)}
                    error={isFilled && methodology === ''}
                    helperText={isFilled && methodology === '' ? 'Methodology cannot be empty' : ''}
                >
                    <MenuItem value="Agile">Agile</MenuItem>
                    <MenuItem value="Waterfall">Waterfall</MenuItem>
                </Select>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {
                    selectedProduct ? (<Button onClick={handleUpdateProduct}>Update</Button>)
                        : (<Button onClick={handleAddProduct}>Add</Button>)
                }
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
