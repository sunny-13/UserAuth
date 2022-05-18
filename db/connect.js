const mongoose = require('mongoose');

const connectDB = async (connectUri) =>{
    try {
        await mongoose.connect(connectUri);
        console.log('database connected');
    } catch (err) {
        console.log('database connection attempt failed.')
    }
}

module.exports = connectDB;