const { Match, Team, Stadium } = require('../models/model');
const { Op } = require('sequelize');

exports.findMatchDetailById = async (matchId) => {
    try {
        return await Match.findOne({
        attributes: ['matchId', 'matchTime'],
        where: { matchId: matchId },
        include: [
            { model: Team, as: 'HomeTeam' },
            { model: Team, as: 'AwayTeam' },
            { model: Stadium }
        ]
    });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.findMatchDetailOnlyById = async (matchId) => {
    try {
        return await Match.findOne({
            where: { matchId: matchId }
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.findMatchesByTimeBound = async (timeLowerBound, timeUpperBound) => {
    try {
        return await Match.findAll({
            attributes: ['matchTime', 'matchId'],
            where: {
                matchTime: {
                    [Op.gt]: timeLowerBound,
                    [Op.lt]: timeUpperBound
                }
            }, include: [
                    { model: Team, as: 'HomeTeam' },
                    { model: Team, as: 'AwayTeam' },
                    { model: Stadium }
                ]
        });
    } catch (e) {
        throw new Error(e.message);
    }
}

exports.findMatchesByTeamAndTimeBound = async (teamId, startOfMonth, endOfMonth, currentKST) => {
    try {
        return await Match.findAll({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: {
                            hometeamId: teamId,
                            awayteamId: teamId
                        }
                    },
                    {
                        matchTime: {
                            [Op.between]: [startOfMonth, endOfMonth]
                        }
                    },
                    {
                        matchTime: {
                            [Op.gt]: currentKST
                        }
                    }
                ]
            },
            limit: 7,
            include: [
                { model: Team, as: 'HomeTeam' },
                { model: Team, as: 'AwayTeam' },
                { model: Stadium }
            ]
        });
    } catch (e) {
        throw new Error(e.message);
    }
};