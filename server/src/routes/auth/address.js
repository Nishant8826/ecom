const express = require('express');
const { addAddress, fetchUserAddress, updateAddress, deleteAddress } = require('../../controllers/auth/address');
const addressRouter = express.Router();


addressRouter.post('/add', addAddress);
addressRouter.get('/get/:userId', fetchUserAddress);
addressRouter.put('/update/:userId/:addressId', updateAddress);
addressRouter.delete('/delete/:userId/:addressId', deleteAddress);

module.exports = addressRouter;