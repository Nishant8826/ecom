const express = require('express');
const { capturePayment, createOrder, getOrderDetails, getAllOrdersByUser } = require('../../controllers/shop/order');
const orderRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and payments
 */

/**
 * @swagger
 * /api/v1/order/create-order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Order created
 */
orderRoutes.post('/create-order', createOrder);

/**
 * @swagger
 * /api/v1/order/capture-payment:
 *   post:
 *     summary: Capture payment for an order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Payment captured successfully
 */
orderRoutes.post('/capture-payment', capturePayment);

/**
 * @swagger
 * /api/v1/order/list/{userId}:
 *   get:
 *     summary: List all orders for a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders
 */
orderRoutes.get('/list/:userId', getAllOrdersByUser);

/**
 * @swagger
 * /api/v1/order/details/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
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
orderRoutes.get('/details/:id', getOrderDetails);

module.exports = orderRoutes;