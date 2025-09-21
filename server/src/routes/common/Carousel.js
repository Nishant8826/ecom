const express = require('express');
const carouselRoutes = express.Router();
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');
const { addCarousel, getCarousel } = require('../../controllers/common/carousel');

carouselRoutes.post('/add', authMiddleware, roleMiddleware('admin'), addCarousel);
carouselRoutes.get('/get', getCarousel);

module.exports = carouselRoutes;
