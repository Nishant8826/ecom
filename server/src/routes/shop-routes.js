const express = require('express');
const { fetchAllProducts } = require('../controllers/admin-controller');
const shopRoutes = express.Router();

shopRoutes.get('/get', fetchAllProducts);


module.exports = shopRoutes;