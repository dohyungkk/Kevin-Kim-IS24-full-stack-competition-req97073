import React, { useState, Fragment } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomizedDialog from './Dialog';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Editable from '../Pages/Editable';
import ReadOnly from '../Pages/ReadOnly';
import { useForm } from "react-hook-form";

const ProductForm = () => {
    const [productId, setProductId] = useState(1)
    const [productName, setProductName] = useState("")
    const [productOwnerName, setProductOwnerName] = useState("")
    // const [developers, setDevelopers] = useState({
    //     developer1: "",
    //     developer2: "",
    //     developer3: "",
    //     developer4: "",
    //     developer5: ""
    // })
    const [developers, setDevelopers] = useState("")
    const [scrumMasterName, setScrumMasterName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [methodology, setMethodology] = useState("")

    const [productData, setProductData] = useState([])
    // console.log(productData)

    const { register, handleSubmit, formState: { errors } } = useForm()

    // we only need these 4 values for edits
    const [editTableData, setEditTableData] = useState({
        productName: "",
        productOwnerName: "",
        developers: "",
        stscrumMasterNameadium: "",
        startDate: "",
        methodology: ""
    })

    // keeping the ID as is
    const [editID, setEditID] = useState(null)

    const submitData = async (e) => {
        // e.preventDefault()
        setProductId(productId => productId + 1)

        const newData = { 
            productId: productId, 
            productName: productName, 
            productOwnerName: productOwnerName, 
            developers: developers, 
            scrumMasterName: scrumMasterName, 
            startDate: startDate, 
            methodology: methodology }

        setProductData([...productData, newData])
        try {
            await axios.post("http://localhost:8000/products", {
                newData
            })
        } catch (err) {
            console.log(err)
        }

        // fetch("http://localhost:8000/products", {
        //     method: "POST",
        //     headers: {"content-type": "application/json"},
        //     body: JSON.stringify(productData)
        // }).then((res) => {
        //     alert("Saved successfully")
        //     navigate('/')
        // }).catch((err) => {
        //     console.log(err)
        // })

        // setProductData({ productId, productName, productOwnerName, developers, scrumMasterName, startDate, methodology })
        // setProductData(productData)
        // JSON.stringify(productData)
        console.log(productData)
    }

    // function to call whenever the inputs are edited
    const editData = (e) => {
        e.preventDefault()
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...editTableData };
        newFormData[fieldName] = fieldValue;

        setEditTableData(newFormData);
    }

    // submit the editted values from Editable.js
    const handleEditTableSubmit = (e, id) => {
        e.preventDefault();

        const editedTeam = {
            productName: editTableData.productName,
            productOwnerName: editTableData.productOwnerName,
            developers: editTableData.developers,
            stscrumMasterName: editTableData.stscrumMasterName,
            startDate: editTableData.startDate,
            methodology: editTableData.methodology
        };

        const newProduct = [...productData];
        const index = productData.findIndex((product) => product.id === editID);
        newProduct[index] = editedTeam;
        setProductData(newProduct);
        setEditID(null);
        try {
            axios.put(`http://localhost:8000/products/${id}`, {
                newProduct
            })
        } catch (error) {
            console.log(error)
        }
    };

    // pass in the saved values on ReadOnly.js view
    const handleEditClick = (e, product) => {
        e.preventDefault();
        setEditID(product.id);

        const editedProduct = {
            productName: product.productName,
            productOwnerName: product.productOwnerName,
            developers: product.developers,
            stscrumMasterName: product.stscrumMasterName,
            startDate: product.startDate,
            methodology: product.methodology
        };
        setEditTableData(editedProduct);
    };

    // cancels the edit
    const handleCancelClick = () => {
        setEditID(null);
    };

    // deletes the row
    const deleteData = (productInfo, id) => {
        const newProduct = [...productData]
        const index = productData.findIndex((product) => product.id === productInfo)
        newProduct.splice(index, 1)
        setProductData(newProduct)
        axios.delete(`http://localhost:8000/products/${id}`, {
            newProduct
        })
    }

    return (
        <>
            <CustomizedDialog>
                <form onSubmit={handleSubmit(submitData)}>
                    <TextField
                        label="Product Name"
                        fullWidth
                        sx={{ m: 0.5 }}
                        {...register("productName", { required: "Product Name is required." })}
                        error={Boolean(errors.productName)}
                        helperText={errors.productName?.message}
                        onChange={(e) => { setProductName(e.target.value) }}
                    />
                    <TextField
                        label="Product Owner Name"
                        fullWidth
                        sx={{ m: 0.5 }}
                        name="productOwnerName"
                        {...register("productOwnerName", { required: "Product Owner Name is required." })}
                        error={Boolean(errors.productOwnerName)}
                        helperText={errors.productOwnerName?.message}
                        onChange={(e) => { setProductOwnerName(e.target.value) }}
                    />
                    <TextField
                        label="Developers"
                        fullWidth
                        sx={{ m: 0.5 }}
                        {...register("developers", { required: "Developer Name is required." })}
                        error={Boolean(errors.developers)}
                        helperText={errors.developers?.message}
                        onChange={(e) => { setDevelopers(e.target.value) }}
                    />
                    <TextField
                        label="Scrum Master Name"
                        fullWidth
                        sx={{ m: 0.5 }}
                        {...register("scrumMasterName", { required: "Scrum Master Name is required." })}
                        error={Boolean(errors.scrumMasterName)}
                        helperText={errors.scrumMasterName?.message}
                        onChange={(e) => { setScrumMasterName(e.target.value) }}
                    />
                    <TextField
                        label="YYYY/MM/DD"
                        fullWidth
                        sx={{ m: 0.5 }}
                        {...register("startDate", { required: "Numbers only for Start Date" })}
                        error={Boolean(errors.startDate)}
                        helperText={errors.startDate?.message}
                        onChange={(e) => { setStartDate(e.target.value) }}
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                sx={{ m: 0.5 }}
                                onChange={(startDate) => setStartDate(startDate)}
                            />
                        </DemoContainer>
                    </LocalizationProvider> */}
                    <InputLabel>Methodology</InputLabel>
                    <Select
                        label="Methodology"
                        fullWidth
                        sx={{ m: 0.5 }}
                        defaultValue=""
                        {...register("methodology", { required: "Methodology is required."  })}
                        error={Boolean(errors.methodology)}
                        helperText={errors.methodology?.message}
                        onChange={(e) => { setMethodology(e.target.value) }}
                    >
                        <MenuItem value="Agile">Agile</MenuItem>
                        <MenuItem value="Waterfall">Waterfall</MenuItem>
                    </Select>
                    {/* <Button type="submit" variant="contained" color="primary" sx={{ m: 0.5, marginLeft: 60 }}>Submit</Button> */}
                    <Button type="submit" variant="contained" color="primary" sx={{ m: 0.5 }}>Submit</Button>
                </form>
            </CustomizedDialog>
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
                                <TableCell>Button</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody onSubmit={handleEditTableSubmit}>
                            {productData.map((product) => (
                                <Fragment>
                                    {editID === product.productId ?
                                        (
                                            <Editable
                                                editTableData={editTableData}
                                                editData={editData}
                                                handleCancelClick={handleCancelClick}
                                            />
                                        ) : (
                                            <ReadOnly
                                                product={product}
                                                handleEditClick={handleEditClick}
                                                deleteData={deleteData}
                                            />
                                        )}
                                </Fragment>
                            ))}

{/* 
                            <TableCell>{productData.productName}</TableCell>
                        <TableCell>{productData.productOwnerName}</TableCell>
                            {productData.map((products) => {
                            return (
                                <TableRow>
                                <TableCell>{products.productId}</TableCell>
                                <TableCell>{products.productName}</TableCell>
                                <TableCell>{products.productOwnerName}</TableCell>
                                <TableCell>{products.developers}</TableCell>
                                <TableCell>{products.scrumMasterName}</TableCell>
                                <TableCell>{products.startDate}</TableCell>
                                <TableCell>{products.methodology}</TableCell>
                            </TableRow>
                            )
                        })}            
                                <TableCell>{productData.productId}</TableCell>
                                <TableCell>{productData.productName}</TableCell>
                                <TableCell>{productData.productOwnerName}</TableCell>
                                <TableCell>{productData.developers}</TableCell>
                                <TableCell>{productData.scrumMasterName}</TableCell>
                                <TableCell>{productData.startDate}</TableCell>
                                <TableCell>{productData.methodology}</TableCell>
                        */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default ProductForm
