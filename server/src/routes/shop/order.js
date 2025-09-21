const express = require('express');
const { capturePayment, createOrder, getOrderDetails, getAllOrdersByUser } = require('../../controllers/shop/order');
const orderRoutes = express.Router();

orderRoutes.post('/create-order', createOrder);
orderRoutes.post('/capture-payment', capturePayment);
orderRoutes.get('/list/:userId', getAllOrdersByUser);
orderRoutes.get('/details/:id', getOrderDetails);

module.exports = orderRoutes;