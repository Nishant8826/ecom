const User = require("../../models/user");
const TryCatch = require("../../utils/tryCatch");


exports.fetchAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({ role: 'user' })
    return res.status(200).send({ status: true, data: users });
})