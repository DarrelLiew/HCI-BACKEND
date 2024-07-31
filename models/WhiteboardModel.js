const mongoose = require('mongoose')
const ObjectSchema =require('./ObjectModel')

const whiteboardSchema = new mongoose.Schema({
    // name:{type:String, requried:false},
    // uniqueId:{type: String, required:false },
    // objects:[ObjectSchema]
    document: { type: String },
    session: { type: String}
})

module.exports = whiteboardSchema   