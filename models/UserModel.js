const mongoose = require('mongoose')
const whiteboardSchema =require('./WhiteboardModel')

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    whiteboards:[whiteboardSchema]
})

const userModel = mongoose.model("User",userSchema)
module.exports = userModel