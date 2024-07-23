const { ReviewImage } = require('../models/model');

exports.createImage = async (imageInfo) => {
    try {
        await ReviewImage.create(imageInfo);
    } catch (e) {
        throw new Error(e.message);
    }
}