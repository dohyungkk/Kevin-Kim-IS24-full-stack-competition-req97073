import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomizedDialogs from './dialog';
import axios from 'axios';

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

    // const [productData, setProductData] = useState(null)
    // console.log(productData)

    const submitData = async (e) => {
        e.preventDefault()
        setProductId(productId => productId + 1)

        const productData = { productId, productName, productOwnerName, developers, scrumMasterName, startDate, methodology }
        
        try {
            await axios.post("http://localhost:8000/products", {
                productData
            })
        } catch (err) {
            console.log(err.message)
        }
        
        // fetch("http://localhost:8000/products", {
        //     method: "POST",
        //     headers: {"content-type": "application/json"},
        //     body: JSON.stringify(productData)
        // }).then((res) => {
        //     alert("Saved successfully")
        //     navigate('/')
        // }).catch((err) => {
        //     console.log(err.message)
        // })

        // setProductData({ productId, productName, productOwnerName, developers, scrumMasterName, startDate, methodology })
        // setProductData(productData)
        // JSON.stringify(productData)
        // console.log(productData)
    }

    return (
        <>

            <CustomizedDialogs>
                <form onSubmit={submitData}>
                    <TextField
                        required
                        label="Product Name"
                        value={productName}
                        fullWidth
                        sx={{ m: 0.5 }}
                        onChange={(e) => { setProductName(e.target.value) }}
                    />
                    <TextField
                        required
                        label="Product Owner Name"
                        value={productOwnerName}
                        fullWidth
                        sx={{ m: 0.5 }}
                        onChange={(e) => { setProductOwnerName(e.target.value) }}
                    />
                    <TextField
                        required
                        label="Developers"
                        value={developers}
                        fullWidth
                        sx={{ m: 0.5 }}
                        onChange={(e) => { setDevelopers(e.target.value) }}
                    />
                    <TextField
                        required
                        label="Scrum Master Name"
                        value={scrumMasterName}
                        fullWidth
                        sx={{ m: 0.5 }}
                        onChange={(e) => { setScrumMasterName(e.target.value) }}
                    />
                    {/* <TextField
                        required
                        label="Date"
                        value={startDate}
                        fullWidth
                        sx={{ m: 0.5 }}
                        onChange={(e) => { setStartDate(e.target.value) }}
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                sx={{ m: 0.5 }}
                                onChange={(startDate) => setStartDate(startDate)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <InputLabel>Methodology</InputLabel>
                    <Select
                        value={methodology}
                        label="Methodology"
                        fullWidth
                        sx={{ m: 0.5 }}
                        onChange={(e) => { setMethodology(e.target.value) }}
                    >
                        {/* const name */}
                        <MenuItem value="Agile">Agile</MenuItem>
                        <MenuItem value="Waterfall">Waterfall</MenuItem>
                    </Select>
                    <Button type="submit" variant="contained" color="primary" sx={{ m: 0.5 }}>Submit</Button>
                </form>
            </CustomizedDialogs>
        </>
    )
}

export default ProductForm
