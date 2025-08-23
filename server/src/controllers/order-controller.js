const config = require("../config/config");
const ErrorClass = require("../utils/ErrorClass");
const TryCatch = require("../utils/tryCatch");
const stripe = require('stripe')(process.env.STRIPE_KEY);


const checkoutSession = TryCatch(async (req, res, next) => {
    const { items } = req.body;
    if (!items || items.length == 0) return next(new ErrorClass('Please add items to proceed with payment', 400));
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
        success_url: `${config.FrontendUrl}/shop/success`,
        cancel_url: `${config.FrontendUrl}/shop/cancel`,
    })


    return res.status(201).json({ success: true, id: session.id });


})


module.exports = { checkoutSession };