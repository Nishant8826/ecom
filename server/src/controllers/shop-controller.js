const productModel = require("../models/Product");
const TryCatch = require("../utils/tryCatch");



const getAllfilteredProducts = TryCatch(async (req, res, next) => {
    const products = await productModel.find({});
    res.status(200).json({ success: true, data: products });
})


module.exports = { getAllfilteredProducts }