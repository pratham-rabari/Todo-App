
const express = require("express")
const mongoose = require("mongoose")


mongoose.connect('mongodb://127.0.0.1:27017/Todo')


const logSchema = new mongoose.Schema({
    username:{
        type:String, 
        
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,
        
       
    }
})
module.exports= mongoose.model("Users",logSchema)