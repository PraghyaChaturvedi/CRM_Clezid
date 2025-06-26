require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connectDB = require("./models/config");
const leadsRoute = require("./routers/leadsRoute");
const projectsRoute = require("./routers/projectsRoute");
const quotationsRoute = require("./routers/quotationsRoute");
const invoicesRoute = require("./routers/invoicesRoute");
const receiptRoute = require("./routers/recieptRoute");


// Connect to MongoDB   
connectDB();


// Middlewares
app.use(express.json());
app.use(cors());
app.use('/files', express.static(path.join(__dirname, 'uploads', 'files')));
app.use('/invoices', express.static(path.join(__dirname, 'uploads', 'invoices')));
app.use('/reciepts', express.static(path.join(__dirname, 'uploads', 'reciepts')));


// Aquiring port from environment variable or default to 2000
const PORT = process.env.PORT || 2000;


// Routes
app.use('/leads', leadsRoute);
app.use('/project', projectsRoute);
app.use('/quotation', quotationsRoute);
app.use('/invoice', invoicesRoute);
app.use('/receipt', receiptRoute);

app.use('/', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server; 