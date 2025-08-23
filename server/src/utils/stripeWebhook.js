const stripe = require('stripe');
const TryCatch = require('./tryCatch');

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

const webhooks = TryCatch(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];

    const payloadString = JSON.stringify(req.body);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    })

    const event = await stripe.webhooks.constructEvent(payloadString, header, endpointSecret);

    let stripeResponse;

    switch (event.type) {
        case 'payment_intent.succeeded':
            stripeResponse = event.data.object
            break;

        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    console.log('stripeResp> ', stripeResponse);
    res.status(200).json({ received: true });
})

module.exports = { webhooks };