const express = require('express');
const { signup, login, logout, authMiddleware } = require('../controllers/auth-controller');
const authRouter = express.Router();


authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({ success: true, message: 'User is authenticated', user });
});


module.exports = authRouter;
