const OrderModel = require("../../models/Order");
const ErrorClass = require("../../utils/ErrorClass");
const TryCatch = require("../../utils/tryCatch");



exports.fetchAllOrders = TryCatch(async (req, res, next) => {
    const orders = await OrderModel.find({});
    if (orders.length == 0) {
        return next(new ErrorClass('No orders found!', 400));
    }

    return res.status(200).json({ success: true, data: orders });
})

exports.fetchOrderDetails = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    if (!id) return next(new ErrorClass('id is invalid', 400));

    const order = await OrderModel.findById(id);
    if (order.length == 0) {
        return next(new ErrorClass('No order found!', 400));
    }

    return res.status(200).json({ success: true, data: order });
})

exports.updateOrderByAdmin = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { orderStatus } = req.body;
    if (!id) return next(new ErrorClass('id is invalid', 400));

    const order = await OrderModel.findById(id);
    if (order.length == 0) {
        return next(new ErrorClass('No order found!', 400));
    }

    const update = await OrderModel.findByIdAndUpdate(id, { orderStatus }, { new: true });

    return res.status(200).json({ success: true, data: update });
})