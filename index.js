const express = require('express')
const connectDB = require('./db.js')
const UserRoute = require('./routes/user.js')
const WhiteboardRoute = require('./routes/whiteboard.js')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
app.use(express.json())
var mongoose = require('mongoose');
app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/user',UserRoute)
app.use('/whiteboard',WhiteboardRoute)
connectDB()

// app.get('/test',async (req,res) => {x
//     const response = await itemModel.find()
//     return res.json({items:response})
// }) 

// app.post('/object',async (req,res) => {
//     const response = await itemModel.find()
//     return res.json({items:response})
// }) 

app.listen(3000, () =>{
    console.log("app is running")
})
 