const User = require("../../models/user");
const ErrorClass = require("../../utils/ErrorClass");
const TryCatch = require("../../utils/tryCatch");



exports.isEmailExist = TryCatch(async (req, res, next) => {
    const { email } = req.body;
    if (!email || email == '') return next(new ErrorClass('email is required', 400));
    const isEmailUnique = await User.findOne({ email })
    if (isEmailUnique && isEmailUnique._id) return next(new ErrorClass('Email is already registered', 200));
    return res.status(201).json({ success: true, });
})
