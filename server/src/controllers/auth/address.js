const AddressModel = require("../../models/address");
const ErrorClass = require("../../utils/ErrorClass");
const TryCatch = require("../../utils/tryCatch");



const addAddress = TryCatch(async (req, res, next) => {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) return next(new ErrorClass('Invalid data!', 400));

    const addressDoc = await AddressModel.create({ userId, address, city, pincode, phone, notes });
    return res.status(201).json({ success: true, data: addressDoc, message: 'Address added successfully' });
})

const fetchUserAddress = TryCatch(async (req, res, next) => {
    const { userId } = req.params;
    if (!userId) return next(new ErrorClass('Invalid data!', 400));

    const addressList = await AddressModel.find({ userId });
    if (!addressList || addressList.length == 0) return res.status(404).json({ success: false, message: 'No Address Found!' });

    return res.status(200).json({ success: true, data: addressList, message: 'Address fetched successfully' });

})

const updateAddress = TryCatch(async (req, res, next) => {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) return next(new ErrorClass('Invalid data!', 400));

    const formData = req.body;
    const addressDoc = await AddressModel.findOneAndUpdate({ userId, _id: addressId }, formData, { new: true });

    if (!addressDoc) return next(new ErrorClass('Address not found!', 404));

    return res.status(200).json({ success: true, data: addressDoc, message: 'Address updated successfully' });

})


const deleteAddress = TryCatch(async (req, res, next) => {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) return next(new ErrorClass('Invalid data!', 400));

    const addressDoc = await AddressModel.findOneAndDelete({ userId, _id: addressId });
    if (!addressDoc) return next(new ErrorClass('Address not found!', 404));


    return res.status(200).json({ success: true, message: 'Address deleted successfully' });

})


module.exports = { addAddress, fetchUserAddress, updateAddress, deleteAddress };