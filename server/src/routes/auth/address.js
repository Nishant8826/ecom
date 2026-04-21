const express = require('express');
const { addAddress, fetchUserAddress, updateAddress, deleteAddress } = require('../../controllers/auth/address');
const addressRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Address
 *   description: User address management
 */

/**
 * @swagger
 * /api/v1/address/add:
 *   post:
 *     summary: Add a new address
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: Address added
 */
addressRouter.post('/add', addAddress);

/**
 * @swagger
 * /api/v1/address/get/{userId}:
 *   get:
 *     summary: Fetch user addresses
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address fetched successfully
 */
addressRouter.get('/get/:userId', fetchUserAddress);

/**
 * @swagger
 * /api/v1/address/update/{userId}/{addressId}:
 *   put:
 *     summary: Update an address
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address updated successfully
 */
addressRouter.put('/update/:userId/:addressId', updateAddress);

/**
 * @swagger
 * /api/v1/address/delete/{userId}/{addressId}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 */
addressRouter.delete('/delete/:userId/:addressId', deleteAddress);

module.exports = addressRouter;