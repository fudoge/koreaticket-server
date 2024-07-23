const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Match = require('./Match');
const User = require('./User');
const Stadium = require('./Stadium');

const Ticket = sequelize.define(
    'tickets',
    {
        ticketId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        stadiumId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Stadium,
                key: 'stadiumId'
            }
        },
        areaId: {
            type: DataTypes.STRING,
            allowNull: false
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