const userRepository = require('../repository/userRepository');
const ticketRepository = require('../repository/ticketRepository');
const inquiryPostRepository = require('../repository/inquiryPostRepository');
const inquiryReplyRepository = require('../repository/inquiryReplyRepository')

exports.getHistory = async (req, res) => {
    const userId = req.user.userId;

    try {
        const foundTickets = await ticketRepository.getUserTickets(userId);
        return res.status(200).json(foundTickets);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.getInquires = async (req, res) => {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * 7;
    
    try {
        const foundUser = await userRepository.findUserByUserId(userId);

        let inquires;
        if (foundUser.isAdmin) {
            inquires = await inquiryPostRepository.findAllPosts(offset);
        } else {
            inquires = await inquiryPostRepository.findUserPosts(userId, offset);
        }

        return res.status(200).json({isAdmin : foundUser.isAdmin, inquiriesInfo: inquires});
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.getInquiryDetail = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    
    try {
        const inquiryInfo = await inquiryPostRepository.findPostDetail(postId);

        if (inquiryInfo.writtenBy != userId) return res.status(403).json("permission denied");
        return res.status(200).json(inquiryInfo);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.postReply = async (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.postId;
    const comment = req.body.comment;

    try {
        const foundUser = userRepository.findUserByUserId(userId);
        
        if (foundUser.isAdmin) {
            
            await inquiryReplyRepository.createComment(postId, comment);
            return res.sendStatus(201);
        } else {
            return res.status(403).json("no permission");
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

exports.postInquiry = async (req, res) => {
    const userId = req.user.userId;
    const { title, type, content } = req.body;

    try {
        await inquiryPostRepository.createPost({
            title: title,
            type: type,
            content: content,
            writtenBy: userId
        });
        return res.sendStatus(201);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}