const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            salePrice: String,
            quantity: Number,
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,
    },
    orderStatus: String,
    paymentStatus: String,
    paymentMethod: String,
    totalAmount: String,
    orderDate: String,
    orderUpdateDate: String,
    paymentId: String,
    payerId: String,
})


const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel;