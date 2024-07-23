const { Op } = require('sequelize');
const { Match, Team, ReviewPost, ReviewImage, Stadium } = require('../models/model');

exports.returnInfos = async (req, res) => {
    const time = new Date();
    time.setHours(time.getHours() + 9);
    const currentKST = time.toISOString();
    time.setDate(time.getDate() + 1);
    const tomorrowKST = time.toISOString();

    try {
        // 헤드라인 경기들 불러오기
        const headLineMatches = await Match.findAll({
            attributes: ['matchTime', 'matchId'],
            where: {
                matchTime: {
                    [Op.gt]: currentKST,
                    [Op.lt]: tomorrowKST
                }
            }, include: [
                    { model: Team, as: 'HomeTeam' },
                    { model: Team, as: 'AwayTeam' },
                    { model: Stadium }
                ]
        });

        // 후기게시판 썸네일과 제목 불러오기
        const reviewPosts = await ReviewPost.findAll({
            attributes: ['postId', 'title'],
            include: [{ model: ReviewImage, where: { isThumbNail: true }, required: false }],
            limit: 4
        });

        //TODO: 외부 API호출해서 순위표 불러오기
        

        return res.status(200).json({ headLineMatches: headLineMatches, reviewPosts: reviewPosts });
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
};