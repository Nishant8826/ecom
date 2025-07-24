const express = require('express');
const { getAllfilteredProducts, getProductDetails } = require('../controllers/shop-controller');
const shopRoutes = express.Router();

shopRoutes.get('/get', getAllfilteredProducts);
shopRoutes.get('/get/:id', getProductDetails);


module.exports = shopRoutes;