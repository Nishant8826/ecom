const express = require('express');
const { getAllfilteredProducts } = require('../controllers/shop-controller');
const shopRoutes = express.Router();

shopRoutes.get('/get', getAllfilteredProducts);


module.exports = shopRoutes;