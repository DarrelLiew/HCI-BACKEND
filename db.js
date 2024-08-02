const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const connectDB = async() => {
    try{
        console.log(process.env.MONGOAPIKEY)
        const conn = await mongoose.connect(
            process.env.MONGOAPIKEY,
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error){
        console.error(error);
        process.exit(1)
    }
}
module.exports = connectDB;