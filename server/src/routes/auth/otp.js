const express = require('express');
const { forgetPassword, verifyOtp, resetPassword } = require('../../controllers/auth/otp');
const otpRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth (OTP)
 *   description: Password reset and OTP services
 */

/**
 * @swagger
 * /api/v1/otp/forget-password:
 *   post:
 *     summary: Request OTP for password reset
 *     tags: [Auth (OTP)]
 *     responses:
 *       200:
 *         description: OTP sent
 */
otpRouter.post('/forget-password', forgetPassword);

/**
 * @swagger
 * /api/v1/otp/verify-otp:
 *   post:
 *     summary: Verify recovery OTP
 *     tags: [Auth (OTP)]
 *     responses:
 *       200:
 *         description: OTP verified
 */
otpRouter.post('/verify-otp', verifyOtp);

/**
 * @swagger
 * /api/v1/otp/reset-password:
 *   post:
 *     summary: Reset password with valid OTP
 *     tags: [Auth (OTP)]
 *     responses:
 *       200:
 *         description: Password reset successful
 */
otpRouter.post('/reset-password', resetPassword);


module.exports = otpRouter;
