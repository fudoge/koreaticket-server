const { Op } = require('sequelize');
const { Match, Team, ReviewPost, ReviewImage } = require('../models/model');
const moment = require('moment');
const now = moment();

exports.returnInfos = async (req, res) => {
    try {
        // 헤드라인 경기들 불러오기
        const headLineMatches = await Match.findAll({
            where: {
                matchTime: {
                    [Op.lt]: now.add(24, 'hours').format(),
                    [Op.gt]: now.format()
                }
            }, include: [
                Team
            ]
        });

        // 후기게시판 썸네일과 제목 불러오기
        const reviewPosts = await ReviewPost.findAll({
            attributes: ['postId', 'title'],
            include: [{ model: ReviewImage, where: { isThumbNail: true }, required: false }],
            limit: 4
        });

        return res.status(200).json({ headLineMatches: headLineMatches, reviewPosts: reviewPosts });
    } catch (e) {
        return res.status(500).json({error: e});
    }
};