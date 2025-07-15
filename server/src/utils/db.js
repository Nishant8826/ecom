const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const Connection = async () => {
    try {
        await mongoose.connect(uri);
        console.log('DB Connected successfully');
    } catch (error) {
        console.log(`Error occured while connecting with DB : `, error.message);
    }
}

module.exports = Connection;