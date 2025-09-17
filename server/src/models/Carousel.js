const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema({
    image: String,
},
    { timestamps: true }
)

const CarouselModal = mongoose.model('Carousel', CarouselSchema);
module.exports = CarouselModal;