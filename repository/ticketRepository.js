const { Match, Team, Stadium } = require('../models/model');

exports.getTicketsByUserId = async () => {
    try {
        return await Ticket.findAll({
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
    } catch (e) {
        throw new Error(e.message);
    }
}

exports.createTicket = async (ticketInfo) => {
    try {
        await Ticket.create(ticketInfo);
    } catch (e) {
        throw new Error(e.message);
    }   
}

