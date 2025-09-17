const cartModel = require("../../models/Cart");
const productModel = require("../../models/Product");
const ErrorClass = require("../../utils/ErrorClass");
const TryCatch = require("../../utils/tryCatch");



const addCart = TryCatch(async (req, res, next) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) return next(new ErrorClass('Invalid data provided!', 400));

    const product = await productModel.findById(productId);
    if (!product) return next(new ErrorClass('Product not found!', 404));

    let cart = await cartModel.findOne({ userId })
    if (!cart) {
        cart = new cartModel({ userId, items: [] });
    }

    const findProductIndex = cart.items.findIndex(i => i.productId.toString() == productId);

    if (findProductIndex == -1) {
        cart.items.push({ productId, quantity });
    } else {
        cart.items[findProductIndex].quantity += quantity;
    }

    await cart.save();
    return res.status(201).json({ success: true, data: cart });
})

const fetchCart = TryCatch(async (req, res, next) => {
    const { userId } = req.params;
    if (!userId) return next(new ErrorClass('Invalid data!', 400));
    const cart = await cartModel.findOne({ userId }).populate({ path: 'items.productId' });
    if (!cart) return next(new ErrorClass('Cart not Found', 404));

    const validItems = cart.items.filter(item => item.productId);

    const populateCartItems = validItems.map((item) => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
    }));

    return res.status(200).json({ success: true, data: { ...cart._doc, items: populateCartItems } });
})


const updateCart = TryCatch(async (req, res, next) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) return next(new ErrorClass('Invalid data provided!', 400));

    const cart = await cartModel.findOne({ userId });
    if (!cart) return next(new ErrorClass('Cart not found', 404));

    const findProductIndex = cart.items.findIndex(i => i.productId.toString() == productId);

    if (findProductIndex == -1) {
        return next(new ErrorClass('Cart item not present!', 404));
    };
    cart.items[findProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({ path: 'items.productId' });

    const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
    }));

    return res.status(200).json({ success: true, data: { ...cart._doc, items: populateCartItems } });


});


const deleteCart = TryCatch(async (req, res, next) => {
    const { userId, productId } = req.params;
    if (!userId || !productId) return next(new ErrorClass('Invalid data', 400));

    const cart = await cartModel.findOne({ userId }).populate({ path: 'items.productId' });
    if (!cart) return next(new ErrorClass('Cart not found!', 404));

    cart.items = cart.items.filter((i) => i.productId._id.toString() !== productId);

    await cart.save();

    await cart.populate({ path: 'items.productId' });


    const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
    }));

    return res.status(200).json({ success: true, data: { ...cart._doc, items: populateCartItems } });

});


module.exports = { addCart, fetchCart, updateCart, deleteCart };
