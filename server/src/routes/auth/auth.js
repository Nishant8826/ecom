const express = require('express');
const { signup, login, logout} = require('../../controllers/auth/auth');
const { authMiddleware } = require('../../middleware/auth');
const authRouter = express.Router();


/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User created successfully
 */
authRouter.post('/signup', signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
authRouter.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
authRouter.post('/logout', logout);

/**
 * @swagger
 * /api/v1/auth/check-auth:
 *   get:
 *     summary: Check authentication status
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User authenticated
 */
authRouter.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({ success: true, message: 'User is authenticated', user });
});


module.exports = authRouter;
