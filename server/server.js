const express = require('express');
require('dotenv').config();
const Connection = require('./src/utils/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();

const authRouter = require('./src/routes/auth-routes.js');
const adminRoutes = require('./src/routes/admin-routes.js');
const shopRoutes = require('./src/routes/shop-routes.js');
const cartRoutes = require('./src/routes/cart-routes.js');
const addressRouter = require('./src/routes/address-routes.js');


Connection();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin/product', adminRoutes);
app.use('/api/v1/shop/product', shopRoutes);
app.use('/api/v1/shop/cart', cartRoutes);
app.use('/api/v1/address', addressRouter);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})