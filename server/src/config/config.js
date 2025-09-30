require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    dbUri: process.env.MONGO_URI ,
    FrontendUrl: process.env.FrontendUrl,
    emailApp : process.env.MAIL_APP,
    appPassword : process.env.MAIL_PASSWORD,
    jwtSecret : process.env.JWT_SECRET,
    stripeKey : process.env.STRIPE_KEY,
    stripeWebhookKey : process.env.STRIPE_WEBHOOK_KEY,
    cloudinaryCloudName : process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey : process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret : process.env.CLOUDINARY_API_SECRET,
};

module.exports = config;

