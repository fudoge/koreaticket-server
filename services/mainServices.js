
const matchRepository = require('../repository/matchRepository');
const reviewRepository = require('../repository/reviewPostRepository');

exports.returnInfos = async (req, res) => {
    const time = new Date();
    time.setHours(time.getHours() + 9);
    const currentKST = time.toISOString();
    time.setDate(time.getDate() + 1);
    const tomorrowKST = time.toISOString();

    try {
        // 헤드라인 경기들 불러오기
        const headLineMatches = await matchRepository.findMatchesByTimeBound(currentKST, tomorrowKST);

        // 후기게시판 썸네일과 제목 불러오기
        const reviewPosts = await reviewRepository.getRecentReviews();

        //TODO: 외부 API호출해서 순위표 불러오기

        return res.status(200).json({ headLineMatches: headLineMatches, reviewPosts: reviewPosts });
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
};