const express = require('express');
const { portfolioContact } = require('../../controllers/common/contact');
const contactRoutes = express.Router();

contactRoutes.post('/portfolio-contact', portfolioContact);

module.exports = contactRoutes;
