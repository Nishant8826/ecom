const config = require("../config/config");
const cartModel = require("../models/Cart");
const OrderModel = require("../models/Order");
const ErrorClass = require("../utils/ErrorClass");
const TryCatch = require("../utils/tryCatch");
const stripe = require('stripe')(process.env.STRIPE_KEY);


const checkoutSession = TryCatch(async (req, res, next) => {
    const { cartItems, totalCartAmount } = req.body;
    const { items, addressInfo, userId } = cartItems;
    if (!userId) return next(new ErrorClass('userId is invalid', 400));
    if (!items || items.length == 0) return next(new ErrorClass('Please add items to proceed with payment', 400));


    const order = await OrderModel.create({
        userId,
        cartItems: items,
        addressInfo,
        orderStatus: "pending",
        paymentStatus: "unpaid",
        paymentMethod: "card",
        totalAmount: totalCartAmount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
    });


    const line_items = items.map((item) => ({
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


    return res.status(201).json({ success: true, id: session.id });


})

const markPaid = TryCatch(async (req, res, next) => {
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



module.exports = { checkoutSession, markPaid };