const teamRepository = require('../repository/teamRepository');
const matchRepository = require('../repository/matchRepository');
const ticketRepository = require('../repository/ticketRepository');

exports.getMatches = async (req, res) => {
    const now = new Date();
    const team = req.params.team;
    const year = req.params.year || now.getFullYear();
    const month = String(req.params.month || now.getMonth() + 1).padStart(2, '0');

    const startOfMonth = now.year(year).month(month - 1).startOf('month').format();
    const endOfMonth = now.year(year).month(month - 1).endOf('month').format();
    now.setHours(now.getHours() + 9);
    const currentKST = now.toISOString();
    

    try {
        let matches;
        if (team) {
            const foundTeam = await teamRepository.findTeamByName(team);

            if (!foundTeam) {
                return res.status(404).json({ error: 'Team not found' });
            }

            matches = await matchRepository.findMatchesByTeamAndTimeBound(foundTeam.teamId, startOfMonth, endOfMonth, currentKST);
        } else {
            matches = await matchRepository.findMatchesByTimeBound(startOfMonth, endOfMonth);
        }

        return res.status(200).json(matches);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};


exports.getMatchDetail = async (req, res) => {
    const matchId = req.params.matchId;
    
    try {
        const foundMatch = matchRepository.findMatchDetailById(matchId);
        if (!foundMatch) {
            return res.status(404).json({error: "no match found!"});
        }

        return res.status(200).json(foundMatch);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
};

exports.getBookingPage = async (req, res) => {
    const matchId = req.params.matchId;
    try {
        const foundMatch = await matchRepository.findMatchDetailById(matchId);

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
        const matchInfo = await matchRepository.findMatchDetailOnlyById(matchId);

        if (!matchInfo) return res.status(404).json("match not found");

        await ticketRepository.createTicket({
            matchId: matchId,
            ownedBy: userId,
            stadiumId: matchInfo.stadiumId,
            ticketCount: amount,
            areaId: areaId
        });

        res.sendStatus(201);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}