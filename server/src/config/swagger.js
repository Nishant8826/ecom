const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API Documentation',
      version: '1.0.0',
      description: 'API documentation for the MERN E-commerce application',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['userName', 'email', 'password'],
          properties: {
            userName: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: 'secret123' },
          },
        },
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: 'secret123' },
          },
        },
        Product: {
          type: 'object',
          required: ['title', 'price', 'category'],
          properties: {
            title: { type: 'string', example: 'Nike Shoes' },
            description: { type: 'string', example: 'Running shoes' },
            category: { type: 'string', example: 'men' },
            brand: { type: 'string', example: 'nike' },
            price: { type: 'number', example: 100 },
            salePrice: { type: 'number', example: 80 },
            totalStock: { type: 'number', example: 50 },
          },
        },
        Address: {
          type: 'object',
          required: ['address', 'city', 'pincode', 'phone'],
          properties: {
            address: { type: 'string', example: '123 Main St' },
            city: { type: 'string', example: 'New York' },
            pincode: { type: 'string', example: '10001' },
            phone: { type: 'string', example: '1234567890' },
            notes: { type: 'string', example: 'Corner house' },
          },
        },
      },
    },
  },
  // Scan for annotations in the routes and controllers directories
  apis: ['./src/routes/**/*.js', './src/controllers/**/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
