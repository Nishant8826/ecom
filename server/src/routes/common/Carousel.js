const express = require('express');
const carouselRoutes = express.Router();
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');
const { addCarousel, getCarousel } = require('../../controllers/common/carousel');

/**
 * @swagger
 * /api/v1/carousel/add:
 *   post:
 *     summary: Add a new carousel image
 *     tags: [Common]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Image added successfully
 */
carouselRoutes.post('/add', authMiddleware, roleMiddleware('admin'), addCarousel);
/**
 * @swagger
 * /api/v1/carousel/get:
 *   get:
 *     summary: Fetch carousel images
 *     tags: [Common]
 *     responses:
 *       200:
 *         description: List of images
 */
carouselRoutes.get('/get', getCarousel);

module.exports = carouselRoutes;
