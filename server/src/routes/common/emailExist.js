const express = require('express');
const { isEmailExist } = require('../../controllers/common/emailExist');
const emailExistRoute = express.Router();

/**
 * @swagger
 * /api/v1/common/is-email-exist:
 *   post:
 *     summary: Check if an email is already registered
 *     tags: [Common]
 *     responses:
 *       200:
 *         description: Email existence status
 */
emailExistRoute.post('/is-email-exist', isEmailExist);

module.exports = emailExistRoute;
