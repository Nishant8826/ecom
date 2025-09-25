const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    type: {
        type: String,
        enum: ["FORGOT_PASSWORD", "VERIFY_EMAIL", "LOGIN_2FA"],
        required: true
    },
    expiry: { type: Date, required: true }
}, { timestamps: true });

const OtpModal = mongoose.model("Otp", otpSchema);
module.exports = OtpModal;
