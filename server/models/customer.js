const mongoose = require('mongoose');
 const {Schema} = mongoose;
 const CustomerSchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        default:"Ahemdabad"
    },
    date:{
        type:Date,
        default:Date.now,
    }
 })

 module.exports = mongoose.model('customers',CustomerSchema);