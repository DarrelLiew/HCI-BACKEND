const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(
            'mongodb+srv://admin:sbDtQ1KhhYWJaRSU@objects.48aqm5e.mongodb.net/Accounts?retryWrites=true&w=majority&appName=Objects',
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error){
        console.error(error);
        process.exit(1)
    }
}
module.exports = connectDB;