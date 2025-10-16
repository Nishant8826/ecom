const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');
const app = express();
const morgan = require('morgan');
const Connection = require('./config/db');


const webhookRoute = require('./routes/stripeWebhook');
const logger = require('./logger');
const authRouter = require('./routes/auth/auth');
const adminRoutes = require('./routes/admin/admin');
const adminOrder = require('./routes/admin/order');
const addressRouter = require('./routes/auth/address');
const cartRoutes = require('./routes/shop/cart');
const orderRoutes = require('./routes/shop/order');
const reviewRoutes = require('./routes/shop/review');
const searchRoutes = require('./routes/shop/search');
const shopRoutes = require('./routes/shop/shop');
const carouselRoutes = require('./routes/common/Carousel');
const emailExistRoute = require('./routes/common/emailExist');
const otpRouter = require('./routes/auth/otp');
const adminUserRoutes = require('./routes/admin/users');
const contactRoutes = require('./routes/common/contact');

const allowedOrigins = [
  "http://localhost:5173",
  "https://new-portfolio-mu-teal.vercel.app",
  config.FrontendUrl
];


Connection();

const corsOptions = {
  origin: (origin) => allowedOrigins.includes(origin) || !origin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

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
app.use('/api/v1/otp', otpRouter);
app.use('/api/v1/address', addressRouter);
app.use('/api/v1/carousel', carouselRoutes);

app.use('/api/v1/admin/product', adminRoutes);
app.use('/api/v1/admin/order', adminOrder);
app.use('/api/v1/admin/users', adminUserRoutes);

app.use('/api/v1/shop/product', shopRoutes);
app.use('/api/v1/shop/search', searchRoutes);
app.use('/api/v1/shop/cart', cartRoutes);
app.use('/api/v1/shop/review', reviewRoutes);

app.use('/api/v1/order', orderRoutes);
app.use('/stripe', webhookRoute);

app.use('/api/v1/common', emailExistRoute);
app.use('/api', contactRoutes);

app.use(errorHandler);


module.exports = app;