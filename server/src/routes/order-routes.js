const express = require('express');
const { checkoutSession, markPaid } = require('../controllers/order-controller');
const orderRoutes = express.Router();

orderRoutes.post('/create-checkout-session', checkoutSession);
orderRoutes.post('/mark-paid', markPaid);

module.exports = orderRoutes;