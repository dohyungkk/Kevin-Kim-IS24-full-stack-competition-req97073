const express = require("express")
const bodyParser = require("body-parser") 
const cors = require("cors") 
const productRoutes = require("./routes/routes")

const app = express()
const host = 'http://localhost'
const port = 8000

// app.use(bodyParser.json())
// app.use(cors)

app.get("/", (req, res) => res.send("Hello from express"))
app.all("*", (req, res) => res.send("That route does not exist"))

app.listen(port, () => console.log(`Server is running on port: ${host}:${port}`))