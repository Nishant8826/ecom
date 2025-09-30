const config = require('./config');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
});


const imageUploadUtil = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });
    return result;
}


module.exports = { imageUploadUtil };
