const express = require('express');
const { handleImageUpload, fetchAllProducts, addProduct, updateProduct, deleteProduct } = require('../../controllers/admin/admin');
const adminRoutes = express.Router();
const multer = require('multer');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');
const upload = multer({ storage: new multer.memoryStorage() });

adminRoutes.use(authMiddleware,roleMiddleware('admin'))

/**
 * @swagger
 * tags:
 *   name: Admin Products
 *   description: API for managing products (Admin only)
 */

/**
 * @swagger
 * /api/v1/admin/product/image-upload:
 *   post:
 *     summary: Upload a product image
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
adminRoutes.post('/image-upload', upload.single('image'), handleImageUpload);

/**
 * @swagger
 * /api/v1/admin/product/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product added successfully
 */
adminRoutes.post('/add', addProduct);

/**
 * @swagger
 * /api/v1/admin/product/get:
 *   get:
 *     summary: Get all products
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 */
adminRoutes.get('/get', fetchAllProducts);

/**
 * @swagger
 * /api/v1/admin/product/edit/{id}:
 *   put:
 *     summary: Edit an existing product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
adminRoutes.put('/edit/:id', updateProduct);

/**
 * @swagger
 * /api/v1/admin/product/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
adminRoutes.delete('/delete/:id', deleteProduct);

module.exports = adminRoutes;
