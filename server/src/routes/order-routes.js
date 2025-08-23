const express = require('express');
const { checkoutSession } = require('../controllers/order-controller');
const orderRoutes = express.Router();

orderRoutes.post('/create-checkout-session', checkoutSession);

module.exports = orderRoutes;