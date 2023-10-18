const express = require('express')
const colors= require('colors')
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const authRoutes = require('./routes/authRoute')
const categoryRoutes = require('./routes/categoryRoute')
const productRoutes = require('./routes/productRoutes')
const path = require('path')
const cors = require('cors')



dotenv.config();
connectdb();

const app = express();


app.use(cors());
app.use(express.static(path.join(__dirname,'./client/build')))

app.use(express.json());
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`.bgCyan.white)
})