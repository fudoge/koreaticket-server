const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Match = require('./Match');
const StadiumArea = require('./StadiumArea');
const User = require('./User');

const Ticket = sequelize.define(
    'tickets',
    {
        ticketId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        matchId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Match,
                key: 'matchId'
            }
        },
        areaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: StadiumArea,
                key: 'areaId'
            }
        },
        ownedBy: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
        ticketCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: true,
        updatedAt: false
    }
);

module.exports = Ticket;