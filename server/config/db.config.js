const mongoose = require("mongoose")
const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
        })
        console.log("MongoDB connected sucessfully")
    } catch (error) {
        console.log("Connection Error")
        
    }
 }
module.exports = dbConnect