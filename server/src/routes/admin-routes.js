const express = require('express');
const { handleImageUpload, fetchAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/admin-controller');
const adminRoutes = express.Router();
const multer = require('multer');
const upload = multer({ storage: new multer.memoryStorage() });


adminRoutes.post('/product/image-upload', upload.single('image'), handleImageUpload);
adminRoutes.post('/product/add', addProduct);
adminRoutes.get('/product/get', fetchAllProducts);
adminRoutes.put('/product/edit/:id', updateProduct);
adminRoutes.delete('/product/delete/:id', deleteProduct);

module.exports = adminRoutes;
