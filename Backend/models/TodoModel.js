const express = require("express")
const mongoose = require("mongoose")


const TodoSchema = mongoose.Schema({
    title:String,
    desc:String
})

module.exports = mongoose.model("todos", TodoSchema)