const mongoose = require('mongoose');
const user_schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    },
    password:{
        type:String,
        required:true,
        minlength:8,
       // select:false,//removes password from query
    },
    confirm_password:{
        type:String,
        required:true,
        minlength:8,
    }
   
},{
    timestamps: true, // creates createdAt and updatedAt fields automatically
})
const user=mongoose.model('user',user_schema);
module.exports = user;