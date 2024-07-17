const { Sequelize, Datatypes } = require('sequelize');
const sequelize = require('../db/db');
const Match = require('./Match');
const StadiumArea = require('./StadiumArea');
const User = require('./User');

const Ticket = sequelize.define(
    'tickets',
    {
        ticketId: {
            type: Datatypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        matchId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: Match,
                key: 'matchId'
            }
        },
        areaId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: StadiumArea,
                key: 'areaId'
            }
        },
        ownedBy: {
            type: Datatypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
        ticketCount: {
            type: Datatypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: true,
        updatedAt: false
    }
);

module.exports = Ticket;