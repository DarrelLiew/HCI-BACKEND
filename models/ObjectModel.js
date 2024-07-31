const mongoose = require('mongoose')
const ObjectSchema = new mongoose.Schema({
    UniqueId:{type: String, required:true },
    ObjectId:{type:String, required:true},
    ObjectType:{type:String, required:true},
    Parent:{type:String, required:false},
    Children:{type:Array, required:false}
})

module.exports = ObjectSchema