const productModel = require("../models/Product");
const ErrorClass = require("../utils/ErrorClass");
const TryCatch = require("../utils/tryCatch");


exports.searchProducts = TryCatch(async (req, res, next) => {
    const { keyword } = req.params;
    if (!keyword || typeof keyword != 'string') return next(new ErrorClass('Invalid Keyword!', 400));
    const regex = new RegExp(keyword, 'i');
    const createSearchQuery = {
        $or: [
            { title: regex },
            { description: regex },
            { category: regex },
            { brand: regex }
        ]
    }
    const products = await productModel.find(createSearchQuery);
    return res.status(200).send({ success: true, data: products });
})