const errorHandler = (err, req, res, next) => {
    err.message = err.message || 'Internal Server Error';
    err.status = err.statusCode || 500;
    res.status(err.status).json({ success: false, message: err.message });
};

module.exports = errorHandler;
