const mongoose = require('mongoose');
const config = require('./config');
const logger = require('../logger');


const Connection = async () => {
    try {
        await mongoose.connect(config.dbUri);
        console.log('DB Connected successfully');
        logger.info('DB Connected successfully');
    } catch (error) {
        logger.error(`Error occured while connecting with DB : `, error);
        process.exit(1); // Exit process on DB connection failure
    }
}

module.exports = Connection;