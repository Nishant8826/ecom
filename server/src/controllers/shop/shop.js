const productModel = require("../../models/Product");
const TryCatch = require("../../utils/tryCatch");



const getAllfilteredProducts = TryCatch(async (req, res, next) => {
    const { brand = [], category = [], sortBy } = req.query;
    const filters = {};

    if (brand.length > 0) {
        filters.brand = { $in: brand.split(',') };
    };

    if (category.length > 0) {
        filters.category = { $in: category.split(',') };
    };

    let sort = {};

    switch (sortBy) {
        case "price-lowtohigh":
            sort.price = 1;

            break;
        case "price-hightolow":
            sort.price = -1;

            break;
        case "title-atoz":
            sort.title = 1;

            break;

        case "title-ztoa":
            sort.title = -1;

            break;

        default:
            sort.price = 1;
            break;
    }

    const products = await productModel.find(filters).sort(sort);
    res.status(200).json({ success: true, data: products });
});


const getProductDetails = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const productDetail = await productModel.findById(id);
    res.status(200).json({ success: true, data: productDetail });
})


module.exports = { getAllfilteredProducts, getProductDetails };