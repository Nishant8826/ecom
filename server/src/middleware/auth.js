const ErrorClass = require("../utils/ErrorClass");
const jwt = require('jsonwebtoken');


exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return next(new ErrorClass("You are not authenticated", 401));
        const decoded = await jwt.verify(token, 'ECOMMERCE_SECRET');
        if (!decoded) return next(new ErrorClass("Invalid token", 401));
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ErrorClass("Authentication failed", 401));
    }
};


// Role-based middleware (e.g., admin only)
exports.roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ success: false, message: `Only ${requiredRole}s can access this` });
        }
        next();
    };
};