const express = require('express');
const { forgetPassword, verifyOtp, resetPassword } = require('../../controllers/auth/otp');
const otpRouter = express.Router();


otpRouter.post('/forget-password', forgetPassword);
otpRouter.post('/verify-otp', verifyOtp);
otpRouter.post('/reset-password', resetPassword);


module.exports = otpRouter;
