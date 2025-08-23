const TryCatch = require("../utils/tryCatch");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const ErrorClass = require("../utils/ErrorClass");
const jwt = require("jsonwebtoken");

// signup controller
const signup = TryCatch(async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) return next(new ErrorClass("Please provide all required fields", 200));
    const existingUserName = await userModel.findOne({ userName });
    if (existingUserName) return next(new ErrorClass("Username already exists", 200));
    const existimgEmail = await userModel.findOne({ email });
    if (existimgEmail) return next(new ErrorClass("Email already exists", 200));
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userModel.create({ userName, email, password: hashedPassword });
    const token = await jwt.sign(user.toObject(), 'ECOMMERCE_SECRET', { expiresIn: '1h' });
    res.status(201).json({ success: true, message: 'User registered successfully', user, token });
});

// login controller
const login = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorClass("Please provide all required fields", 200));
    const user = await userModel.findOne({ email });
    if (!user) return next(new ErrorClass("User not found", 404));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorClass("Password is incorrect", 401));
    const token = await jwt.sign(user.toObject(), 'ECOMMERCE_SECRET', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false }).json({ success: true, message: 'User logged in successfully', user });
});

//logout controller
const logout = TryCatch(async (req, res) => {
    res.clearCookie('token').json({ success: true, message: 'User logged out successfully' });
});




module.exports = { signup, login, logout };