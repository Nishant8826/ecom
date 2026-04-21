const express = require('express');
const adminOrder = express.Router();
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');
const { fetchOrderDetails, fetchAllOrders, updateOrderByAdmin } = require('../../controllers/admin/order');

adminOrder.use(authMiddleware,roleMiddleware('admin'))

/**
 * @swagger
 * tags:
 *   name: Admin Orders
 *   description: Order management for admins
 */

/**
 * @swagger
 * /api/v1/admin/order/fetch-all-orders:
 *   get:
 *     summary: Fetch all customer orders
 *     tags: [Admin Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
adminOrder.get('/fetch-all-orders', fetchAllOrders);

/**
 * @swagger
 * /api/v1/admin/order/fetch/{id}:
 *   get:
 *     summary: Fetch order details
 *     tags: [Admin Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
adminOrder.get('/fetch/:id', fetchOrderDetails);

/**
 * @swagger
 * /api/v1/admin/order/update/{id}:
 *   put:
 *     summary: Update order status
 *     tags: [Admin Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order updated
 */
adminOrder.put('/update/:id', updateOrderByAdmin);

module.exports = adminOrder;
