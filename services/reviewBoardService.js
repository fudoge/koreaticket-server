const { Op } = require("sequelize");
const {ReviewPost, ReviewImage, ReviewComment, User} = require("../models/model");
const path = require('path');
const fs = require('fs-extra');
const UPLOADS_DIR = path.join(__dirname, '../../public/uploads/');

exports.loadPosts = async (req, res) => {
    const page = parseInt(req.query.page - 1) || 1;
    const offset = (page - 1) * 10;
    const search = req.query.search || '';

    try {
        const reviewPosts = await ReviewPost.findAndCountAll({
            attributes: ['postId', 'isNotice', 'writtenBy', 'title', 'createdAt'],
            where: {
                [Op.or]: [
                    {isNotice: {[Op.eq]: true}},
                    {title: {[Op.like]: `%${search}%`}},
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
            offset : offset,
            limit: 10,
            order: [['isNotice', 'DESC'], ['postId', 'DESC']]
        });
        
        return res.status(200).json({
            count: reviewPosts.count,
            reviewPosts: reviewPosts.rows
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

exports.loadPostDetail = async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await ReviewPost.findOne({
            where: {
                postId: postId
            }, include: [
                {
                    model: ReviewComment,
                    order: [['createdAt', 'ASC']],
                    required: false
                }
            ]
        });

        if (!post) return res.status(404).json({ error: "Not Found" });
        return res.status(200).json(post);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

exports.uploadImages = async (req, res) => {
    try {
        const imageUrls = await Promise.all(req.files.map(async (file) => {
            const tempPath = file.path;
            const targetPath = path.join(UPLOADS_DIR, file.originalname);
            await fs.move(tempPath, targetPath, { overwrite: true });
            return `/uploads/${file.originalname}`;
        }));

        res.status(200).json(imageUrls);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;
    let isNotice = false;

    try {
        const foundUser = User.findOne({ where: { userId: userId } });
        if (foundUser.userId === userId) isNotice = true;

        await ReviewPost.create({
            title: title,
            content: content,
            writtenBy: userId,
            isNotice: isNotice
        });

        return res.sendStatus(201);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.deletePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    try {
        const Post = await ReviewPost.findOne({ where: { postId: postId } });
        if (Post.writtenBy != userId) return res.status(403).json('You have no permission');

        await ReviewPost.destroy({
            where: { postId: postId }
        });
        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.createComment = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.userId;
    const { message } = req.body;
    try {
        await ReviewComment.create({
            content: message,
            writtenBy: userId,
            postId: postId
        });
        return res.sendStatus(201);
    } catch (e) {
        return req.status(500).json({ error: e.message });
    }
}

exports.deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.userId;
    try {
        const foundUser = await User.findOne({ where: { email: email } });
        if (!foundUser) {
            return res.status(400).json({ error: "Cannot find User" });
        }

        const foundComment = await ReviewComment.findOne({ where: { commentId: commentId } });
        if (!foundComment) return res.status(404).json({ error: "comment not found" });
    } catch (e) {
        return req.status(500).json(e.message);
    }

    if (foundUser.uuid != foundComment.writtenBy) {
        return res.status(403).json({ error: "no permission" });
    }

    try {
        ReviewComment.destroy({
            where: { commentId: commentId }
        });
        return res.status(204).json();
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}