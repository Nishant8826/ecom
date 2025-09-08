const express = require('express');
const adminOrder = express.Router();
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');
const { fetchOrderDetails, fetchAllOrders } = require('../../controllers/admin/order');

adminOrder.use(authMiddleware,roleMiddleware('admin'))

adminOrder.get('/fetch-all-orders', fetchAllOrders);
adminOrder.get('/fetch/:id', fetchOrderDetails);

module.exports = adminOrder;
