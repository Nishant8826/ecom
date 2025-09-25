const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');
const { fetchAllUsers } = require('../../controllers/admin/users');
const adminUserRoutes = express.Router();

adminUserRoutes.use(authMiddleware, roleMiddleware('admin'))

adminUserRoutes.get('/fetch-all', fetchAllUsers);

module.exports = adminUserRoutes;
