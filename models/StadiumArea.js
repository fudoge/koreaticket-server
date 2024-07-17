const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Match = require('./Match');
const Stadium = require('./Stadium');

const StadiumArea = sequelize.define(
    'stadiumarea', 
    {
        areaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        areaName: {
            type: DataTypes.STRING(64),
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
        currentBooked: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    }
);

module.exports = StadiumArea;