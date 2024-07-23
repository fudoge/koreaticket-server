const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Team = require('./Team');
const Stadium = require('./Stadium');

const Match = sequelize.define(
    'matches', {
        matchId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        homeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: 'teamId'
            }
        },
        awayId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: 'teamId'
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
        matchTime: {
            type: DataTypes.DATE,
            allowNull: false
        }
}, {
        timestamp: false
    }
);

module.exports = Match;