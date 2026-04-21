const express = require('express');
const { webhooks } = require('../utils/stripeWebhook');
const webhookRoute = express.Router();


/**
 * @swagger
 * tags:
 *   name: Stripe
 *   description: Stripe payment webhooks
 */

/**
 * @swagger
 * /stripe/webhook:
 *   post:
 *     summary: Stripe Webhook endpoint
 *     tags: [Stripe]
 *     responses:
 *       200:
 *         description: Event received
 */
webhookRoute.post('/webhook',webhooks);


module.exports = webhookRoute;