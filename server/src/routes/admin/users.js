const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');
const { fetchAllUsers } = require('../../controllers/admin/users');
const adminUserRoutes = express.Router();

adminUserRoutes.use(authMiddleware, roleMiddleware('admin'))

/**
 * @swagger
 * tags:
 *   name: Admin Users
 *   description: User management for admins
 */

/**
 * @swagger
 * /api/v1/admin/users/fetch-all:
 *   get:
 *     summary: Fetch all registered users
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
adminUserRoutes.get('/fetch-all', fetchAllUsers);

module.exports = adminUserRoutes;
