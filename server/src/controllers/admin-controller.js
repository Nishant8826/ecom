const productModel = require("../models/Product");
const { imageUploadUtil } = require("../utils/cloudinary");
const TryCatch = require("../utils/tryCatch");
const ErrorClass = require("../utils/ErrorClass");


const handleImageUpload = TryCatch(async (req, res, next) => {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);
    res.status(200).json({ success: true, result });
});


const addProduct = TryCatch(async (req, res, next) => {
    const { image, title, description, category, brand, price, salePrice, totalStock, averageReview, } = req.body;

    const productData = {
        image,
        title,
        description,
        category,
        brand,
        price: Number(price),
        salePrice: Number(salePrice),
        totalStock: Number(totalStock),
    };

    await productModel.create(productData);
    res.status(201).json({ success: true, message: "Product added successfully" });
});


const fetchAllProducts = TryCatch(async (req, res, next) => {
    const products = await productModel.find();
    res.status(200).json({ success: true, data: products });
});


const updateProduct = TryCatch(async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return next(new ErrorClass("Product ID is required", 400));
    }
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
    const findProduct = await productModel.findById(productId);
    if (!findProduct) {
        return next(new ErrorClass("Product not found", 404));
    }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({ success: true, data: findProduct, message: "Product updated successfully" });
});


const deleteProduct = TryCatch(async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return next(new ErrorClass("Product ID is required", 400));
    }
    const findProduct = await productModel.findByIdAndDelete(productId);
    if (!findProduct) {
        return next(new ErrorClass("Product not found", 404));
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
});

module.exports = { handleImageUpload, addProduct, updateProduct, deleteProduct, fetchAllProducts };