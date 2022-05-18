const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const connectDB = require('./db/connect');
const userAuthDetails = require('./db/model');
const route = require('./routes/route')

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',route);

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3001,()=> console.log('server is listening on port 3001'));
        
    } catch (error) {
        console.log(error);
    }
}

start();