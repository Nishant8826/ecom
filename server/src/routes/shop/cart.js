const express = require('express');
const { addCart, fetchCart, deleteCart, updateCart } = require('../../controllers/shop/cart');
const cartRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
 * @swagger
 * /api/v1/shop/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Item added successfully
 */
cartRoutes.post('/add', addCart);

/**
 * @swagger
 * /api/v1/shop/cart/{userId}:
 *   get:
 *     summary: Fetch user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart items fetched
 */
cartRoutes.get('/:userId', fetchCart);

/**
 * @swagger
 * /api/v1/shop/cart/update-cart:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart updated
 */
cartRoutes.put('/update-cart', updateCart);

/**
 * @swagger
 * /api/v1/shop/cart/{userId}/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 */
cartRoutes.delete('/:userId/:productId', deleteCart);


module.exports = cartRoutes;