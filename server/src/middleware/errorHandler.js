const logger = require("../logger");

const errorHandler = (err, req, res, next) => {

    const user = req.user ? {
        _id: req.user._id,
        username: req.user.username,
        role: req.user.role,
    } : 'Unauthenticated';

    const errorDetails = {
        method: req.method,
        url: req.originalUrl,
        user,
        message: err.message,
        stack: err.stack,
    };

    logger.error(`${errorDetails.method} ${errorDetails.url} - ${errorDetails.message}\nUser: ${JSON.stringify(user)}\nSTACK: ${err.stack}`);

    err.message = err.message || 'Internal Servver Error';
    err.code = err.code || 500;
    return res.status(err.code).json({ success: false, message: err.message });
};

module.exports = errorHandler;
