const {Team} = require('../models/model');

exports.findTeamByName = async (team) => {
    try {
        return await Team.findOne({
            where: {teamName: team}
        });
    } catch (e) {
        throw new Error(e.message);
    }
    
};