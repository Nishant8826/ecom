const { portfolioContact } = require("../../services/mailerServices");
const ErrorClass = require("../../utils/ErrorClass");
const TryCatch = require("../../utils/tryCatch");

exports.portfolioContact = TryCatch(async (req, res, next) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return next(new ErrorClass("Name, email, and message are required.", 400));
    }

    const resp = await portfolioContact({ name, email, phone, message });

    return res.status(200).json({ success: true, message: "Your message has been sent successfully!", data: resp, });
});
