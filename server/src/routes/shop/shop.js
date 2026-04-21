const express = require('express');
const { getAllfilteredProducts, getProductDetails } = require('../../controllers/shop/shop');
const shopRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shop
 *   description: API for customers to browse products
 */

/**
 * @swagger
 * /api/v1/shop/product/get:
 *   get:
 *     summary: Get all filtered products
 *     tags: [Shop]
 *     responses:
 *       200:
 *         description: List of products
 */
shopRoutes.get('/get', getAllfilteredProducts);

/**
 * @swagger
 * /api/v1/shop/product/get/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 */
shopRoutes.get('/get/:id', getProductDetails);


module.exports = shopRoutes;