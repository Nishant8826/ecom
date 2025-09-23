require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    dbUri: process.env.MONGO_URI ,
    FrontendUrl: process.env.FrontendUrl,
    emailApp : process.env.MAIL_APP,
    appPassword : process.env.MAIL_PASSWORD,
    jwtSecret : process.env.JWT_SECRET,
};

module.exports = config;

