require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    dbUri: process.env.MONGO_URI ,
    FrontendUrl: process.env.FrontendUrl
};

module.exports = config;

