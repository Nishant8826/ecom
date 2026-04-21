const express = require('express');
const { searchProducts } = require('../../controllers/shop/search');
const searchRoutes = express.Router();


/**
 * @swagger
 * /api/v1/shop/search/{keyword}:
 *   get:
 *     summary: Search for products by keyword
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
searchRoutes.get('/:keyword', searchProducts);


module.exports = searchRoutes;