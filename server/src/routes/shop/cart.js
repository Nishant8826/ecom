const express = require('express');
const { addCart, fetchCart, deleteCart, updateCart } = require('../../controllers/shop/cart');
const cartRoutes = express.Router();

cartRoutes.post('/add', addCart);
cartRoutes.get('/:userId', fetchCart);
cartRoutes.put('/update-cart', updateCart);
cartRoutes.delete('/:userId/:productId', deleteCart);


module.exports = cartRoutes;