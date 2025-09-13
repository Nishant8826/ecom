const express = require('express');
const { addReview, getProductReviews } = require('../controllers/review');
const reviewRoutes = express.Router();


reviewRoutes.post('/add', addReview);
reviewRoutes.get('/:productId', getProductReviews);


module.exports = reviewRoutes;