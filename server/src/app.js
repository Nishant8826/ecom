const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');
const app = express();
const morgan = require('morgan');
const Connection = require('./config/db');

const authRouter = require('./routes/auth-routes');
const adminRoutes = require('./routes/admin/admin');
const shopRoutes = require('./routes/shop-routes');
const cartRoutes = require('./routes/cart-routes');
const addressRouter = require('./routes/address-routes');
const orderRoutes = require('./routes/order-routes');
const webhookRoute = require('./routes/stripeWebhook');
const logger = require('./logger');
const adminOrder = require('./routes/admin/order');


Connection();

app.use(cors({
  origin: config.FrontendUrl,
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true
}));

// Morgan logs to Winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  }
}));

app.use(cookieParser());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin/product', adminRoutes);
app.use('/api/v1/admin/order', adminOrder);
app.use('/api/v1/shop/product', shopRoutes);
app.use('/api/v1/shop/cart', cartRoutes);
app.use('/api/v1/address', addressRouter);
app.use('/api/v1/order', orderRoutes);
app.use('/stripe', webhookRoute);

app.use(errorHandler);


module.exports = app;