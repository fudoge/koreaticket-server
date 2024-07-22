const { Op } = require('sequelize');
const moment = require('moment');
const { Match, Team, Stadium, Ticket } = require('../models/model');
const now = moment();

exports.getMatches = async (req, res) => {
    const team = req.params.team;
    const year = req.params.year || now.year();
    const month = String(req.params.month || now.month() + 1).padStart(2, '0');

    const startOfMonth = now.year(year).month(month - 1).startOf('month').format();
    const endOfMonth = now.year(year).month(month - 1).endOf('month').format();
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 9);
    const currentKST = currentTime.toISOString();
    

    try {
        let matches;
        if (team) {
            const foundTeam = await Team.findOne({
                where: {
                    teamName: team
                }
            });

            if (!foundTeam) {
                return res.status(404).json({ error: 'Team not found' });
            }

            matches = await Match.findAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: {
                                hometeamId: foundTeam.id,
                                awayteamId: foundTeam.id
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
        } else {
            matches = await Match.findAll({
                attributes: ['matchId', 'matchTime'],
                where: {
                    [Op.and]: [
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
        }

        return res.status(200).json(matches);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};


exports.getMatchDetail = async (req, res) => {
    const matchId = req.params.matchId;
    
    try {
        const foundMatch = await Match.findOne({
            attributes: ['matchId', 'matchTime'],
            where: { matchId: matchId },
            include: [
                    { model: Team, as: 'HomeTeam' },
                    { model: Team, as: 'AwayTeam' },
                    { model: Stadium }
                ]
        });

        if (!foundMatch) {
            return res.status(404).json({ erorr: e.message });
        }

        return res.status(200).json(foundMatch);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
};

exports.getBookingPage = async (req, res) => {
    const matchId = req.params.matchId;
    try {
        const foundMatch = await Match.findOne({
            attributes: ['matchId', 'matchTime'],
            where: { matchId: matchId },
            include: [
                    { model: Team, as: 'HomeTeam' },
                    { model: Team, as: 'AwayTeam' },
                    { model: Stadium }
                ]
        });

        if (!foundMatch) return res.status(404).json("Not Found");
        return res.status(200).json(foundMatch);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.bookTicket = async (req, res) => {
    const matchId = req.params.matchId;
    const userId = req.user.userId;
    const { areaId, amount } = req.body;

    try {
        const matchInfo = await Match.findOne({
            where: { matchId: matchId }
        });

        if (!matchInfo) return res.status(404).json("match not found");

        await Ticket.create({
            matchId: matchId,
            ownedBy: userId,
            stadiumId: matchInfo.stadiumId,
            ticketCount: amount,
            areaId : areaId
        });

        res.sendStatus(201);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}