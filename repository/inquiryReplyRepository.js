const { InquiryReply } = require('../models/model');

exports.createComment = async (postId, comment) => {
    try {
        await InquiryReply.create({
        postId: postId,
        content: comment
    });
    } catch (e) {
        throw new Error(e.message);
    }
};