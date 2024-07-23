const { Op } = require('sequelize');
const { ReviewPost, ReviewImage, ReviewComment } = require('../models/model');

exports.findRecentReviews = async () => {
    try {
        return await ReviewPost.findAll({
            attributes: ['postId', 'title'],
            include: [{ model: ReviewImage, where: { isThumbNail: true }, required: false }],
            limit: 4    
        });
    } catch (e) {
        throw new Error(e.message);
    }
};


exports.findPostsWithPaging = async (search, offset) => {
    try {
        return await ReviewPost.findAndCountAll({
            attributes: ['postId', 'isNotice', 'writtenBy', 'title', 'createdAt'],
            where: {
                [Op.or]: [
                    { isNotice: { [Op.eq]: true } },
                    { title: { [Op.like]: `%${search}%` } },
                    { content: { [Op.like]: `%${search}%` } },
                ]
            },
            include: [
                {
                    model: ReviewImage,
                    attributes: ['imagePath'],
                    where: { isThumbNail: true },
                    required: false
                }
            ],
            offset: offset,
            limit: 4,
            order: [['isNotice', 'DESC'], ['postId', 'DESC']]
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.findPostDetail = async (postId) => {
    try {
        return await ReviewPost.findOne({
            where: {
                postId: postId
            }, include: [
                {
                    model: ReviewImage,
                    attributes: ['imagePath'],
                    required: false
                },
                {
                    model: ReviewComment,
                    attributes: ['writtenBy', 'content', 'createdAt'],
                    order: [['createdAt', 'ASC']],
                    required: false
                }
            ]
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.findPostById = async (postId) => {
    try {
        return await ReviewPost.findOne({ where: { postId: postId } });
    } catch (e) {
        throw new Error(e.message);
    }    
}

exports.createPost = async (postInfo) => {
    try {
        await ReviewPost.create(postInfo);
    } catch (e) {
        throw new Error(e.message);
    }
}

exports.deletePostById = async (postId) => {
    await ReviewPost.destroy({
        where: { postId: postId }
    });
};