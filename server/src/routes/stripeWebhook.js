const express = require('express');
const { webhooks } = require('../utils/stripeWebhook');
const webhookRoute = express.Router();


webhookRoute.post('/webhook',webhooks);


module.exports = webhookRoute;