const express = require("express")
const app = express()
const cors = require('cors')
require("dotenv").config()
const dbConnect = require("./config/db.config")
dbConnect()
const port = process.env.Port || 3000
//parse incoming request with json
app.use(express.json());

//enable core policy//
app.use(cors());

//routes------//
 app.use('/api/auth',require('./routes/auth'));
 app.use('/api/customer',require('./routes/customer'));

app.get('/',(req,res)=>{
res.send("welcome to node  app")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
