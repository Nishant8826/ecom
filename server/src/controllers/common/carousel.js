const CarouselModal = require("../../models/Carousel");
const ErrorClass = require("../../utils/ErrorClass");
const TryCatch = require("../../utils/tryCatch");



exports.addCarousel = TryCatch(async (req, res, next) => {
    const { image } = req.body;
    if (!image || image == '') return next(new ErrorClass('Image is required', 400));
    const featureImages = await CarouselModal.create({ image });
    res.status(201).json({ success: true, data: featureImages, });
})

exports.getCarousel = TryCatch(async (req, res, next) => {
    const featureImages = await CarouselModal.find({});
    res.status(201).json({ success: true, data: featureImages, });
})