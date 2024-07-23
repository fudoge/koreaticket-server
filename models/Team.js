const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Stadium = require('./Stadium');

const Team = sequelize.define(
    'teams', 
    {
        teamId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stadiumId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Stadium,
                key: 'stadiumId',
                unique: true
            }
        }
    }, {
        timestamps: false
    }
);

module.exports = Team;