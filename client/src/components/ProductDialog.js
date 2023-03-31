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
import { useForm } from "react-hook-form";

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

    const MAX_DEVELOPERS = 5;
    const developerTextFields = Array(MAX_DEVELOPERS)
        .fill("")
        .map((_, index) => ({
            value: developers[index] || "",
            key: index,
        }));

    const { register, handleSubmit, formState: { errors } } = useForm()
    const callError = (data) => console.log(data)

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

    const clearFields = () => {
        setProductName('')
        setProductOwnerName('')
        setScrumMasterName('')
        setStartDate('')
        setDevelopers(['', '', '', '', ''])
        setMethodology('')
    }

    const handleDeveloperNameChange = (e, index) => {
        const newDevelopers = [...developers];
        newDevelopers[index] = e.target.value;
        setDevelopers(newDevelopers);
    };

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
    };

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
    };

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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{selectedProduct ? 'Update' : 'Add'} Product</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    label="Product Name"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={productName}
                    {...register("productName", { required: "Product Name is required." })}
                    error={Boolean(errors.productName)}
                    helperText={errors.productName?.message}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <TextField
                    required
                    label="Product Owner Name"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={productOwnerName}
                    {...register("productOwnerName", { required: "Product Owner Name is required." })}
                    onChange={(e) => setProductOwnerName(e.target.value)}
                />
                {
                    developerTextFields.map(({ value, key }) => (
                        <TextField
                            key={key}
                            label={`Developer ${key + 1}`}
                            fullWidth
                            sx={{ m: 0.5 }}
                            value={value}
                            onChange={(e) => handleDeveloperNameChange(e, key)}
                        />
                    ))
                }
                <TextField
                    label="Scrum Master Name"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={scrumMasterName}
                    {...register("scrumMasterName", { required: "Scrum Master Name is required." })}
                    onChange={(e) => setScrumMasterName(e.target.value)}
                />
                <TextField
                    label="YYYY-MM-DD"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={startDate}
                    {...register("startDate", { required: "Numbers only for Start Date" })}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <InputLabel>Methodology</InputLabel>
                <Select
                    label="Methodology"
                    fullWidth
                    sx={{ m: 0.5 }}
                    value={methodology}
                    {...register("methodology", { required: "Methodology is required." })}
                    onChange={(e) => setMethodology(e.target.value)}
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
