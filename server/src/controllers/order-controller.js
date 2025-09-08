const config = require("../config/config");
const cartModel = require("../models/Cart");
const OrderModel = require("../models/Order");
const ErrorClass = require("../utils/ErrorClass");
const TryCatch = require("../utils/tryCatch");
const stripe = require('stripe')(process.env.STRIPE_KEY);


const createOrder = TryCatch(async (req, res, next) => {
    const { userId, cartItems, totalAmount, addressInfo, orderStatus, paymentStatus, paymentMethod, orderDate, orderUpdateDate } = req.body;
    if (!userId) return next(new ErrorClass('userId is invalid', 400));
    if (!cartItems || cartItems.length == 0) return next(new ErrorClass('Please add items to proceed with payment', 400));


    let order = await OrderModel.create({
        userId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentStatus,
        paymentMethod,
        totalAmount,
        orderDate,
        orderUpdateDate,
    });


    const line_items = cartItems.map((item) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item.title,
                images: [item.image],
                metadata: {
                    productId: item.productId
                }
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${config.FrontendUrl}/shop/success?orderId=${order._id}`,
        cancel_url: `${config.FrontendUrl}/shop/cancel?orderId=${order._id}`,
        metadata: { orderId: order._id.toString() },
    })

    order.stripeSessionId = session.id;
    await order.save();

    return res.status(201).json({ success: true, id: session.id });


})

const capturePayment = TryCatch(async (req, res, next) => {
    const { orderId } = req.body;
    if (!orderId) return next(new ErrorClass('orderId is invalid', 400));

    const order = await OrderModel.findByIdAndUpdate(orderId, {
        orderStatus: "confirmed",
        paymentStatus: "paid",
        orderUpdateDate: new Date(),
    }, { new: true });

    if (!order) return next(new ErrorClass("Order not found", 404));

    await cartModel.findOneAndUpdate(
        { userId: order.userId },
        { $set: { items: [] } }
    );

    return res.status(200).json({ success: true });
});


const getAllOrdersByUser = TryCatch(async (req, res, next) => {
    const { userId } = req.params;
    if (!userId) return next(new ErrorClass('userId is invalid', 400));

    const orders = await OrderModel.find({ userId });
    if (orders.length == 0) {
        return next(new ErrorClass('No orders found!', 400));
    }

    return res.status(200).json({ success: true, data: orders });
})


const getOrderDetails = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    if (!id) return next(new ErrorClass('id is invalid', 400));

    const order = await OrderModel.findById(id );
    if (order.length == 0) {
        return next(new ErrorClass('No order found!', 400));
    }

    return res.status(200).json({ success: true, data: order });
})


module.exports = { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };