const { InquiryPost, InquiryReply, Match, Stadium, Team, Ticket, User } = require('../models/model');

exports.getHistory = async (req, res) => {
    const userId = req.user.userId;

    try {
        const foundTickets = await Ticket.findAll({
            where: {
                ownedBy: userId
            },
            include: [
                {
                    model: Match,
                    include: [
                        {model: Team, as: 'HomeTeam'},
                        {model: Team, as: 'AwayTeam'},
                    ]
                },
                {
                    model: Stadium
                }
            ]
        });

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
        const foundUser = await User.findOne({
            where: { userId: userId }
        });

        let inquires;
        if (foundUser.isAdmin) {
            inquires = await InquiryPost.findAll({
                limit: 7,
                offset: offset
            });
        } else {
            inquires = await InquiryPost.findAll({
                where: {
                    writtenBy: userId
                },
                limit: 7,
                offset: offset
            });
        }        

        return res.status(200).json({isAdmin : true, inquiriesInfo: inquires});
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.getInquiryDetail = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    
    try {
        const inquiryInfo = await InquiryPost.findOne({
            where: { postId: postId },
            include: [{
                model: InquiryReply
            }]
        });

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
        const foundUser = User.findOne({
            where: { userId: userId }
        });
        
        if (foundUser.isAdmin) {
            
            await InquiryReply.create({
                postId: postId,
                content: comment
            });
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
        await InquiryPost.create({
            title: title,
            type: type,
            content: content
        });
        return res.sendStatus(201);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

