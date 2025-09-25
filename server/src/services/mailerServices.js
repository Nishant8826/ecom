const nodemailer = require("nodemailer");
const config = require("../config/config");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.emailApp,
        pass: config.appPassword,
    },
});

exports.sendWelcomeEmail = async (user) => {
    try {
        let templatePath = path.join(__dirname, "templates/signup.template");
        let htmlContent = fs.readFileSync(templatePath, "utf8");

        htmlContent = htmlContent.replace(/{{userName}}/g, user.userName).replace(/{{storeUrl}}/g, config.FrontendUrl);

        let info = await transporter.sendMail({
            from: '"DevStore" <devstore@gmail.com>',
            to: user.email,
            subject: "Welcome to NDevStore!",
            html: htmlContent,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}

exports.forgotPasswordOtp = async (user) => {
    try {
        let templatePath = path.join(__dirname, "templates/forgotPassword.template");
        let htmlContent = fs.readFileSync(templatePath, "utf8");

        htmlContent = htmlContent.replace(/{{otp}}/g, user.otp);

        let info = await transporter.sendMail({
            from: '"Support" <devstore@gmail.com>',
            to: user.email,
            subject: "Password Reset OTP",
            html: htmlContent,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}