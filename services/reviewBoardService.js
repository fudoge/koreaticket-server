const reviewPostRepository = require('../repository/reviewPostRepository');
const userRepository = require('../repository/userRepository');
const reviewCommentRepository = require('../repository/reviewCommentRepository');

exports.loadPosts = async (req, res) => {
    const page = parseInt(req.query.page - 1) || 1;
    const offset = (page - 1) * 4;
    const search = req.query.search || '';

    try {
        const reviewPosts = await reviewPostRepository.findPostsWithPaging(search, offset);
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
        const post = await reviewPostRepository.findPostDetail(postId);
        if (!post) return res.status(404).json({ error: "Not Found" });
        return res.status(200).json(post);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;
    let isNotice = false;
    try {
        const foundUser = await userRepository.findUserByUserId(userId);
        if (foundUser.isAdmin) isNotice = true;

        const generatedPost = await reviewPostRepository.createPost({
            title: title,
            content: content,
            writtenBy: userId,
            isNotice: isNotice
        });

        if (files) {
            const [thumbNailFile, ...otherFiles] = req.files;
            await reviewImageRepository.createImage({
                isThumbNail: true,
                postId: generatedPost.postId,
                path: thumbNailFile.path
            });

            const filePromises = otherFiles.map(async (file) => reviewImageRepository.createImage({
                isThumbNail: false,
                postId: generatedPost.postId,
                path: file.path
            }));

            await (Promise.all(filePromises));
        }

        return res.sendStatus(201);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.deletePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    try {
        const foundUser = await userRepository.findUserByUserId(userId);
        const Post = await reviewPostRepository.findPostById(postId);
        if (Post.writtenBy != userId || !foundUser.isAdmin) return res.status(403).json('You have no permission');

        reviewPostRepository.deletePostById(postId);
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
        await reviewCommentRepository.createComment({
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
        const foundUser = await userRepository.findUserByUserId(userId);
        if (!foundUser) {
            return res.status(400).json({ error: "Cannot find User" });
        }

        const foundComment = await reviewCommentRepository.findCommentById(commentId);
        if (!foundComment) return res.status(404).json({ error: "comment not found" });

        if (foundUser.uuid != foundComment.writtenBy) {
            return res.status(403).json({ error: "no permission" });
        }

        await reviewCommentRepository.deleteCommentById(commentId);
        return res.status(204).json();
    } catch (e) {
        return req.status(500).json(e.message);
    }
}