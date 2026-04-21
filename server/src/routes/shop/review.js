const express = require('express');
const { addReview, getProductReviews } = require('../../controllers/shop/review');
const reviewRoutes = express.Router();


/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product reviews API
 */

/**
 * @swagger
 * /api/v1/shop/review/add:
 *   post:
 *     summary: Add a product review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Review added
 */
reviewRoutes.post('/add', addReview);

/**
 * @swagger
 * /api/v1/shop/review/{productId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 */
reviewRoutes.get('/:productId', getProductReviews);


module.exports = reviewRoutes;