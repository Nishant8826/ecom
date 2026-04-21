const express = require('express');
const { portfolioContact } = require('../../controllers/common/contact');
const contactRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Common
 *   description: Shared or portfolio-related services
 */

/**
 * @swagger
 * /api/portfolio-contact:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Common]
 *     responses:
 *       200:
 *         description: Message sent
 */
contactRoutes.post('/portfolio-contact', portfolioContact);

module.exports = contactRoutes;
