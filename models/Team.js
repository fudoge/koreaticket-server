const { Sequelize, Datatypes } = require('sequelize');
const sequelize = require('../db/db');
const Stadium = require('Stadium');

const Team = sequelize.define(
    'teams', 
    {
        teamId: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        teamName: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        stadiumId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: Stadium,
                key: 'stadiumId',
                unique: true
            }
        },
        logoImagePath: {
            type: Datatypes.STRING(512),
            unique: true,
            allowNull: false
        }
    }, {
        timestamps: false
    }
);

module.exports = Team;