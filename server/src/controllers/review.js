const OrderModel = require("../models/Order");
const productModel = require("../models/Product");
const ProductReviewModel = require("../models/review");
const ErrorClass = require("../utils/ErrorClass");
const TryCatch = require("../utils/tryCatch");


exports.addReview = TryCatch(async (req, res, next) => {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;
    const order = await OrderModel.findOne({
        userId,
        "cartItems.productId": productId,
        orderStatus: "confirmed" || "delivered",
    });

    if (!order) return next(new ErrorClass("You need to purchase product to review it.", 403));

    const checkExistinfReview = await ProductReviewModel.findOne({ productId, userId });

    if (checkExistinfReview) return next(new ErrorClass("You already reviewed this product!", 400));

    const newReview = new ProductReviewModel({
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue,
    });

    await newReview.save();
    const reviews = await ProductReviewModel.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewsLength;

    await productModel.findByIdAndUpdate(productId, { averageReview });
    return res.status(201).json({ success: true, data: newReview, });
})

exports.getProductReviews = TryCatch(async (req, res, next) => {
    const { productId } = req.params;
    if (!productId) return next(new ErrorClass('Invalid Product ID', 400));
    const reviews = await ProductReviewModel.find({ productId });
    return res.status(200).json({ success: true, data: reviews, });
})