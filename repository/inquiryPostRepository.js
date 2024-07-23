const { InquiryPost, InquiryReply } = require('../models/model');

exports.findAllPosts = async (offset) => {
    try {
        return await InquiryPost.findAll({
            limit: 7,
            offset: offset
        }); 
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.findUserPosts = async (userId, offset) => {
    try {
        return await InquiryPost.findAll({
            where: {
                writtenBy: userId
            },
            limit: 7,
            offset: offset
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.findPostDetail = async (postId) => {
    try {
        return await InquiryPost.findOne({
            where: { postId: postId },
            include: [{
                model: InquiryReply
            }]
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.createPost = async (postInfo) => {
    try {
        await InquiryPost.create(postInfo);
    } catch (e) {
        throw new Error(e.message);
    }
};