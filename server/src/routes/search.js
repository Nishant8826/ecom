const express = require('express');
const { searchProducts } = require('../controllers/search');
const searchRoutes = express.Router();


searchRoutes.get('/:keyword', searchProducts);


module.exports = searchRoutes;