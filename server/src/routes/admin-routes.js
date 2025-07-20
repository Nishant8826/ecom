const express = require('express');
const { handleImageUpload, fetchAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/admin-controller');
const adminRoutes = express.Router();
const multer = require('multer');
const upload = multer({ storage: new multer.memoryStorage() });


adminRoutes.post('/image-upload', upload.single('image'), handleImageUpload);
adminRoutes.post('/add', addProduct);
adminRoutes.get('/get', fetchAllProducts);
adminRoutes.put('/edit/:id', updateProduct);
adminRoutes.delete('/delete/:id', deleteProduct);

module.exports = adminRoutes;
