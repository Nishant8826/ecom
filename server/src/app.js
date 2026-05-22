const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const morgan = require('morgan');
const Connection = require('./config/db');


const webhookRoute = require('./routes/stripeWebhook');
const logger = require('./logger');
const client = require('prom-client');

// Prometheus metrics setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] 
});
register.registerMetric(httpRequestDurationMicroseconds);

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


Connection();

const corsOptions = {
  origin: [
  "https://new-portfolio-mu-teal.vercel.app",
  config.FrontendUrl,
],
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

// Prometheus request duration middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    let route = req.route ? req.route.path : req.path;
    if (route !== '/metrics') {
      httpRequestDurationMicroseconds
        .labels(req.method, route, res.statusCode)
        .observe(duration);
    }
  });
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});


// routes
app.get('/api/v1/check', (req, res) => {
  res.send('Hello World!');
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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