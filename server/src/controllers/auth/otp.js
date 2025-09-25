const bcrypt = require('bcrypt');
const OtpModal = require("../../models/Otp");
const User = require("../../models/user");
const { forgotPasswordOtp } = require("../../services/mailerServices");
const ErrorClass = require("../../utils/ErrorClass");
const TryCatch = require("../../utils/tryCatch");

exports.forgetPassword = TryCatch(async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(new ErrorClass(`email is invalid`, 400));
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorClass(`Email not found!`, 404));
    // 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // 10 minutes
    await OtpModal.create({ email, otp, type: "FORGOT_PASSWORD", expiry: Date.now() + 10 * 60 * 1000, });
    await forgotPasswordOtp({ email, otp });
    res.status(200).json({ success: true, message: "OTP sent successfully to your email", });
});

// verify otp for forget password
exports.verifyOtp = TryCatch(async (req, res, next) => {
    const { email, otp, type } = req.body;
    if (!email || !otp || !type) return next(new ErrorClass("Email, OTP, and type are required", 400));
    const otpRecord = await OtpModal.findOne({ email, otp, type });
    if (!otpRecord) return next(new ErrorClass("Invalid OTP", 400));
    if (otpRecord.expiry < Date.now()) return next(new ErrorClass("OTP expired", 400));
    res.status(200).json({ success: true, message: "OTP verified successfully" });
});


// change password
exports.resetPassword = TryCatch(async (req, res, next) => {
    const { email, newPassword, cnfPassword } = req.body;
    if (!email || !newPassword) return next(new ErrorClass("Email and Password are required", 400));
    if (newPassword !== cnfPassword) return next(new ErrorClass("Passwords do not match", 400));
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorClass("User not found", 404));
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ success: true, message: "Password changed successfully" });
});



