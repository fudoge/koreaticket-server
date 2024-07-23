const { ReviewComment } = require('../models/model');

exports.findCommentById = async (commentId) => {
    try {
        return await ReviewComment.findOne({ where: { commentId: commentId } });    
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.createComment = async (commentInfo) => {
    try {
        await ReviewComment.create(commentInfo);
    } catch (e) {
        throw new Error(e.message);
    }
}

exports.deleteCommentById = async (commentId) => {
    try {
        await ReviewComment.destroy({
            where: { commentId: commentId }
        });
    } catch (e) {
        throw new Error(e.message);
    }
};