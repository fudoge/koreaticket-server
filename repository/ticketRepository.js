const { Match, Team, Stadium, Ticket } = require('../models/model');

exports.getTicketsByUserId = async (userId) => {
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

